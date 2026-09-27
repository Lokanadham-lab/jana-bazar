async function supabaseAdmin(url,serviceKey,path,options={}){
  const r=await fetch(`${url.replace(/\/$/,'')}${path}`,{
    ...options,
    headers:{
      apikey:serviceKey,
      Authorization:`Bearer ${serviceKey}`,
      'Content-Type':'application/json',
      ...(options.headers||{})
    }
  });
  const text=await r.text();
  let data=null; try{data=text?JSON.parse(text):null}catch{data={raw:text}}
  return {ok:r.ok,status:r.status,data};
}

export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const url=process.env.SUPABASE_URL;
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bootstrapToken=process.env.JANA_ADMIN_BOOTSTRAP_TOKEN;
  if(!url||!serviceKey||!bootstrapToken) return res.status(503).json({error:'Admin bootstrap is not configured. Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and JANA_ADMIN_BOOTSTRAP_TOKEN.'});
  const body=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
  if(!body.token || body.token!==bootstrapToken) return res.status(401).json({error:'Invalid bootstrap token'});
  const email=String(body.email||'').trim().toLowerCase();
  const password=String(body.password||'');
  const role=body.role==='super_admin'?'super_admin':'admin';
  if(!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({error:'Enter a valid admin email'});
  if(password.length<12) return res.status(400).json({error:'Admin password must be at least 12 characters'});
  const name=String(body.name||'JANA BAZAR Admin').trim().slice(0,120);

  const list=await supabaseAdmin(url,serviceKey,'/auth/v1/admin/users?per_page=1000&page=1');
  if(!list.ok) return res.status(502).json({error:'Could not inspect Supabase Auth users',details:list.data});
  const users=Array.isArray(list.data?.users)?list.data.users:[];
  const existing=users.find(u=>String(u.email||'').toLowerCase()===email);
  const payload={password,email_confirm:true,user_metadata:{name},app_metadata:{role}};
  let result;
  if(existing){
    result=await supabaseAdmin(url,serviceKey,`/auth/v1/admin/users/${existing.id}`,{method:'PUT',body:JSON.stringify(payload)});
  }else{
    result=await supabaseAdmin(url,serviceKey,'/auth/v1/admin/users',{method:'POST',body:JSON.stringify(payload)});
  }
  if(!result.ok) return res.status(502).json({error:'Supabase could not provision the admin account',details:result.data});
  return res.status(200).json({ok:true,email,role,action:existing?'updated':'created',userId:result.data?.id||existing?.id||null,message:'Admin account provisioned. Remove JANA_ADMIN_BOOTSTRAP_TOKEN from Vercel after first successful setup.'});
}
