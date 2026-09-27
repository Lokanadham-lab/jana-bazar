export default function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  const configured=Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
  const bootstrapEnabled=Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.JANA_ADMIN_BOOTSTRAP_TOKEN);
  res.status(200).json({configured,bootstrapEnabled,adminAuth:'supabase'});
}
