export default function handler(req,res){res.status(200).json({ok:true,service:'jana-bazar',version:'14.0-production-launch-candidate',time:new Date().toISOString()});}
