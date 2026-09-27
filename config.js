export default function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || '',
    locationApiBase: process.env.LOCATION_API_BASE || '/api/locations',
    reverseGeocodeApiBase: process.env.REVERSE_GEOCODE_API_BASE || '/api/reverse-geocode'
  });
}
