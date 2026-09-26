export default async function handler(req,res){
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
  const {lat,lng}=req.query||{};
  if(!lat||!lng)return res.status(400).json({error:'lat and lng are required'});
  const tpl=process.env.REVERSE_GEOCODE_URL_TEMPLATE;
  if(!tpl)return res.status(503).json({error:'Reverse geocoding provider is not configured'});
  const url=tpl.replace('{lat}',encodeURIComponent(lat)).replace('{lng}',encodeURIComponent(lng));
  try{
    const r=await fetch(url,{headers:{Accept:'application/json','User-Agent':'JANA-BAZAR/production'}});
    if(!r.ok)return res.status(502).json({error:'Reverse geocoding provider failed'});
    const raw=await r.json();
    // Provider adapters should normalize their response to this shape before production use.
    const normalized={stateCode:raw.stateCode||raw.state_code||'',districtCode:raw.districtCode||raw.district_code||'',mandalCode:raw.mandalCode||raw.subdistrictCode||raw.subdistrict_code||'',panchayatCode:raw.panchayatCode||raw.localBodyCode||raw.local_body_code||'',villageCode:raw.villageCode||raw.village_code||'',pincode:raw.pincode||raw.postcode||'',address:raw.address||raw.display_name||''};
    res.setHeader('Cache-Control','private, max-age=300');
    return res.status(200).json(normalized);
  }catch(e){return res.status(502).json({error:'Reverse geocoding failed'});}
}
