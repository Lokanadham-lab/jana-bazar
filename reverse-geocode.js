export default async function handler(req,res){
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
  const {lat,lng}=req.query||{};
  const la=Number(lat),lo=Number(lng);
  if(!Number.isFinite(la)||!Number.isFinite(lo)||la<-90||la>90||lo<-180||lo>180)return res.status(400).json({error:'Valid lat and lng are required'});
  const configured=process.env.REVERSE_GEOCODE_URL_TEMPLATE;
  const url=configured
    ? configured.replace('{lat}',encodeURIComponent(String(la))).replace('{lng}',encodeURIComponent(String(lo)))
    : `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(String(la))}&lon=${encodeURIComponent(String(lo))}&zoom=18&addressdetails=1`;
  try{
    const r=await fetch(url,{headers:{Accept:'application/json','User-Agent':'JANA-BAZAR/20.0 (location lookup; contact configured by deployment owner)','Accept-Language':'en'}});
    if(!r.ok)return res.status(502).json({error:'Reverse geocoding provider failed'});
    const raw=await r.json();
    const a=raw.address||{};
    const normalized={
      stateCode:raw.stateCode||raw.state_code||'',
      state:raw.state||a.state||'',
      districtCode:raw.districtCode||raw.district_code||'',
      district:raw.district||raw.state_district||a.state_district||a.county||'',
      mandalCode:raw.mandalCode||raw.subdistrictCode||raw.subdistrict_code||'',
      mandal:raw.mandal||a.subdistrict||a.municipality||a.town||'',
      panchayatCode:raw.panchayatCode||raw.localBodyCode||raw.local_body_code||'',
      panchayat:raw.panchayat||a.village||a.town||a.city||a.municipality||'',
      villageCode:raw.villageCode||raw.village_code||'',
      village:raw.village||a.village||a.hamlet||a.suburb||'',
      pincode:raw.pincode||raw.postcode||a.postcode||'',
      address:raw.address||raw.display_name||''
    };
    res.setHeader('Cache-Control','private, max-age=300');
    return res.status(200).json(normalized);
  }catch(e){return res.status(502).json({error:'Reverse geocoding failed'});}
}