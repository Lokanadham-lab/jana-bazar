const ALLOWED_LEVELS=new Set(['state','district','subdistrict','local_body','village']);
export default async function handler(req,res){
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
  const {level,parent,search,limit='5000'}=req.query||{};
  if(!ALLOWED_LEVELS.has(level))return res.status(400).json({error:'Invalid location level'});
  const base=process.env.SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!base||!key)return res.status(503).json({error:'Location database is not configured'});
  const qs=new URLSearchParams({select:'code,name',level:`eq.${level}`,active:'eq.true',order:'name.asc',limit:String(Math.min(Number(limit)||5000,10000))});
  if(parent)qs.set('parent_code',`eq.${parent}`);
  if(search)qs.set('name',`ilike.*${String(search).replace(/[,*()]/g,'')}*`);
  try{
    const r=await fetch(`${base.replace(/\/$/,'')}/rest/v1/location_units?${qs}`,{headers:{apikey:key,Authorization:`Bearer ${key}`}});
    const text=await r.text();
    if(!r.ok)return res.status(502).json({error:'Location database query failed'});
    res.setHeader('Cache-Control','public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({items:JSON.parse(text)});
  }catch(e){return res.status(500).json({error:'Location service failed'});}
}
