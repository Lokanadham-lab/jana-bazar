export default function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  const has=(...keys)=>keys.every(k=>Boolean(process.env[k]));
  res.status(200).json({ok:true,integrations:{
    supabase:has('SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','SUPABASE_PUBLISHABLE_KEY'),
    otp:has('SUPABASE_URL','SUPABASE_PUBLISHABLE_KEY'),
    paymentGateway:has('PAYMENT_PROVIDER','PAYMENT_API_KEY','PAYMENT_WEBHOOK_SECRET'),
    sms:has('SMS_PROVIDER','SMS_API_KEY'),
    whatsapp:has('WHATSAPP_PROVIDER','WHATSAPP_TOKEN'),
    bbps:has('BBPS_PROVIDER','BBPS_API_KEY','BBPS_SECRET'),
    fastag:has('FASTAG_PROVIDER','FASTAG_API_KEY','FASTAG_SECRET'),
    lpg:has('LPG_PROVIDER','LPG_API_KEY','LPG_SECRET'),
    maps:has('MAPS_PROVIDER','MAPS_API_KEY'),
    shipping:has('SHIPPING_PROVIDER','SHIPPING_API_KEY','SHIPPING_SECRET'),
    notifications:has('NOTIFICATION_PROVIDER','NOTIFICATION_API_KEY'),
    ai:has('AI_PROVIDER','AI_API_KEY')
  }});
}