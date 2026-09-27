const json=(res,status,body)=>res.status(status).json(body);
async function sb(url,key,path,options={}){
  const r=await fetch(`${url.replace(/\/$/,'')}${path}`,{...options,headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',...(options.headers||{})}});
  const t=await r.text(); let data={}; try{data=t?JSON.parse(t):{}}catch{data={raw:t}} return {ok:r.ok,status:r.status,data};
}
async function authUser(req){
  const auth=String(req.headers.authorization||''); const token=auth.startsWith('Bearer ')?auth.slice(7):'';
  const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key||!token)return null;
  const r=await fetch(`${url.replace(/\/$/,'')}/auth/v1/user`,{headers:{apikey:key,Authorization:`Bearer ${token}`}});
  if(!r.ok)return null; const u=await r.json();
  const p=await sb(url,key,`/rest/v1/profiles?select=id,role,status&id=eq.${encodeURIComponent(u.id)}&limit=1`);
  const profile=p.data?.[0]; if(!profile||profile.status!=='active')return null;
  return {user:u,profile,token};
}
function adminOrDelivery(a){return a?.profile?.role==='delivery_partner'||a?.profile?.role==='admin'||a?.profile?.role==='super_admin'}
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(!['GET','POST'].includes(req.method))return json(res,405,{error:'Method not allowed'});
  const a=await authUser(req); if(!a)return json(res,401,{error:'Authenticated delivery partner required'}); if(!adminOrDelivery(a))return json(res,403,{error:'Delivery access denied'});
  const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  const parts=String(req.url||'').split('?')[0].split('/').filter(Boolean); const tail=parts.slice(2);
  if(req.method==='GET' && tail[0]==='jobs'){
    let q=`/rest/v1/delivery_assignments?select=id,delivery_id,partner_id,zone_id,offered_at,accepted_at,distance_km,deliveries(order_id,status,tracking_code,eta_minutes)&order=created_at.desc&limit=100`;
    if(a.profile.role==='delivery_partner'){
      const p=await sb(url,key,`/rest/v1/delivery_partners?select=id&id=eq.${a.user.id}&limit=1`); const partner=p.data?.[0];
      if(!partner)return json(res,200,{items:[]}); q+=`&partner_id=eq.${partner.id}`;
    }
    const r=await sb(url,key,q); if(!r.ok)return json(res,502,{error:'Could not load delivery jobs'}); return json(res,200,{items:r.data||[]});
  }
  if(req.method==='POST' && tail.length===2 && tail[1]==='accept'){
    const id=tail[0];
    const p=await sb(url,key,`/rest/v1/delivery_assignments?select=id,delivery_id,partner_id&id=eq.${encodeURIComponent(id)}&limit=1`); const arow=p.data?.[0]; if(!arow)return json(res,404,{error:'Assignment not found'});
    if(a.profile.role==='delivery_partner'){
      const partner=await sb(url,key,`/rest/v1/delivery_partners?select=id&id=eq.${a.user.id}&limit=1`); if(partner.data?.[0]?.id!==arow.partner_id)return json(res,403,{error:'Assignment does not belong to this partner'});
    }
    const upd=await sb(url,key,`/rest/v1/delivery_assignments?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify({accepted_at:new Date().toISOString()})});
    if(!upd.ok)return json(res,502,{error:'Could not accept delivery'});
    await sb(url,key,`/rest/v1/delivery_events`,{method:'POST',body:JSON.stringify({delivery_id:arow.delivery_id,actor_user_id:a.user.id,event_type:'PARTNER_ACCEPTED',status:'PARTNER_ACCEPTED',idempotency_key:`accept:${id}`})});
    return json(res,200,{ok:true,id});
  }
  return json(res,404,{error:'Delivery endpoint not found'});
}
