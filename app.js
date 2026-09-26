(() => {
"use strict";

const KEY="JB_V9_DB";
const CATS=["All","Groceries","Fruits & Vegetables","Electronics","Mobiles","Fashion","Home & Kitchen","Beauty","Appliances","Furniture","Books","Toys","Baby","Sports","Automotive","Agriculture","Handmade","Kirana","B2B / Wholesale","Services"];
const SELLER_TYPES=["Farmer","FPO","Homemade","Kirana","Local Manufacturer","Brand","National Distributor","Regional Distributor","Dealer","Wholesaler","Retailer","Service Provider"];

const SEED_PRODUCTS=[
{id:"p1",name:"Premium Rice 5kg",category:"Groceries",price:599,mrp:650,stock:100,seller:"JANA BAZAR",sellerType:"Brand",rating:4.6,reviews:120,icon:"🍚"},
{id:"p2",name:"Fresh Apples 1kg",category:"Fruits & Vegetables",price:180,mrp:210,stock:50,seller:"Local Farmer",sellerType:"Farmer",rating:4.7,reviews:88,icon:"🍎"},
{id:"p3",name:"Smart Phone",category:"Electronics",price:8999,mrp:9999,stock:15,seller:"JANA BAZAR",sellerType:"Brand",rating:4.4,reviews:230,icon:"📱"},
{id:"p4",name:"Cotton T-Shirt",category:"Fashion",price:399,mrp:499,stock:35,seller:"Local Brand",sellerType:"Brand",rating:4.5,reviews:64,icon:"👕"},
{id:"p5",name:"Homemade Mango Pickle",category:"Handmade",price:349,mrp:399,stock:25,seller:"Amma Ruchi",sellerType:"Homemade",rating:4.8,reviews:94,icon:"🥫"},
{id:"p6",name:"LED Smart Bulb",category:"Home & Kitchen",price:129,mrp:169,stock:60,seller:"Local Manufacturer",sellerType:"Local Manufacturer",rating:4.3,reviews:201,icon:"💡"},
{id:"p7",name:"A4 Office Paper 500 Sheets",category:"B2B / Wholesale",price:279,mrp:320,stock:500,seller:"Coastal Distributors",sellerType:"National Distributor",rating:4.6,reviews:88,icon:"📄"},
{id:"p8",name:"Natural Neem Soap",category:"Beauty",price:69,mrp:90,stock:90,seller:"Village Naturals",sellerType:"Manufacturer",rating:4.7,reviews:154,icon:"🧼"}
];

const SEED={
location:"Visakhapatnam",
products:SEED_PRODUCTS,
cart:[],
wishlist:[],
orders:[],
users:[],
sellers:[
{id:"s1",name:"Local Farmer",type:"Farmer",location:"Visakhapatnam",status:"approved"},
{id:"s2",name:"Amma Ruchi",type:"Homemade",location:"Visakhapatnam",status:"approved"},
{id:"s3",name:"Jana Kirana",type:"Kirana",location:"Visakhapatnam",status:"approved"}
],
campaigns:[],
tickets:[],
wallet:{balance:0,transactions:[]},
adminAudit:[],
currentUser:null
};

function clone(x){return JSON.parse(JSON.stringify(x))}
function load(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||"null");
    const db=saved?Object.assign(clone(SEED),saved):clone(SEED);
    db.products=db.products||[]; db.users=db.users||[]; db.sellers=db.sellers||[];
    db.cart=db.cart||[]; db.wishlist=db.wishlist||[]; db.orders=db.orders||[];
    db.adminAudit=db.adminAudit||[];
    return db;
  }catch(e){return clone(SEED)}
}
let db=load();

const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>(JB_CONFIG.currency||"₹")+Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:2});
const save=()=>localStorage.setItem(KEY,JSON.stringify(db));
function toast(t){const x=$("#toast");x.textContent=t;x.style.display="block";clearTimeout(window.__jbToast);window.__jbToast=setTimeout(()=>x.style.display="none",2500)}
function modal(html){$("#modalRoot").innerHTML=`<div class="modal-backdrop"><div class="modal">${html}</div></div>`}
function close(){ $("#modalRoot").innerHTML="" }
function isAdmin(){return !!db.currentUser && ["admin","super_admin"].includes(db.currentUser.role)}
function isDemo(){return !JB_CONFIG.supabaseUrl || JB_CONFIG.mode==="demo"}

function update(){
  $("#locationText").textContent=db.location;
  $("#cartCount").textContent=db.cart.reduce((a,x)=>a+x.qty,0);
  $("#loginBtn").textContent=db.currentUser?`👤 ${db.currentUser.name||db.currentUser.email||"Account"}`:"👤 Login";
  $("#modeBar").textContent=isDemo()
    ?"DEMO MODE • Local data only. Production auth, OTP, payments and admin authorization must run on Supabase/backend."
    :"CONNECTED MODE • Supabase authentication enabled.";
}

function renderCats(){
  $("#categories").innerHTML=CATS.map((c,i)=>`<button class="${i===0?"active":""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  $("#categories").querySelectorAll("button").forEach(b=>b.onclick=()=>filter(b.dataset.cat));
}

function productCard(p){
  const off=p.mrp>p.price?Math.round((1-p.price/p.mrp)*100):0;
  return `<article class="card">
    <div class="product-img">${esc(p.icon||"🛍️")}</div>
    <div class="rating">★ ${p.rating||4.5} (${p.reviews||0})</div>
    <h3>${esc(p.name)}</h3>
    <div class="muted">${esc(p.seller)} • ${esc(p.sellerType||"Seller")}</div>
    <p><span class="price">${money(p.price)}</span> <span class="mrp">${money(p.mrp)}</span> <span class="discount">${off}% off</span></p>
    <div class="toolbar"><button class="btn small" onclick="JB.add('${p.id}')">Add to Cart</button><button class="btn small secondary" onclick="JB.product('${p.id}')">View</button><button class="btn small secondary" onclick="JB.wish('${p.id}')">♡</button></div>
  </article>`;
}

function home(){
 const q=(db.q||"").toLowerCase();
 const ps=db.products.filter(p=>!q||`${p.name} ${p.category} ${p.seller} ${p.sellerType}`.toLowerCase().includes(q));
 $("#app").innerHTML=`<div class="container">
  <section class="hero">
    <div><img class="hero-logo" src="assets/jana-bazar-dark.png" alt="JANA BAZAR"><h1>India's People's Marketplace</h1>
    <p>Farmers • FPOs • Homemade • Kirana • Manufacturers • Brands • Distributors • Dealers • Wholesalers • Retailers • Services</p>
    <div class="row"><button class="btn orange" onclick="JB.seller()">Sell on JANA BAZAR</button><a class="btn secondary" href="#b2b">B2B Marketplace</a></div></div>
    <div class="hero-side"><div class="stat"><b>Multi-Vendor</b><p>One marketplace</p></div><div class="stat"><b>Hyperlocal</b><p>Nearby commerce</p></div><div class="stat"><b>B2B</b><p>Bulk sourcing</p></div><div class="stat"><b>Utilities</b><p>Wallet & bills</p></div></div>
  </section>
  <div class="section-head"><h2>Marketplace Ecosystem</h2></div>
  <div class="grid">${SELLER_TYPES.slice(0,8).map(t=>`<div class="card"><h3>${esc(t)}</h3><p class="muted">Explore ${esc(t)} listings.</p></div>`).join("")}</div>
  <div class="section-head"><h2>Products</h2><a class="btn small secondary" href="#products">View all</a></div>
  <div class="grid">${ps.map(productCard).join("")||`<div class="empty">No products found.</div>`}</div>
 </div>`;
}

function products(list=db.products,title="Products"){
 $("#app").innerHTML=`<div class="container"><div class="section-head"><div><h2>${esc(title)}</h2><p class="muted">${list.length} products</p></div></div><div class="grid">${list.map(productCard).join("")||`<div class="empty">No products found.</div>`}</div></div>`;
}
function filter(c){db.q=c==="All"?"":c;save();if(c==="All")products(db.products);else products(db.products.filter(p=>p.category===c||p.sellerType===c),c)}
function search(q){db.q=q||"";home();update()}
function add(id){const i=db.cart.find(x=>x.id===id);i?i.qty++:db.cart.push({id,qty:1});save();update();toast("Added to cart")}
function wish(id){db.wishlist.includes(id)?db.wishlist=db.wishlist.filter(x=>x!==id):db.wishlist.push(id);save();toast(db.wishlist.includes(id)?"Added to wishlist":"Removed from wishlist")}
function product(id){const p=db.products.find(x=>x.id===id);if(!p)return;modal(`<button class="close" onclick="JB.close()">×</button><img class="product-img" src="assets/jana-bazar-logo.png" alt=""><h2>${esc(p.name)}</h2><p class="muted">${esc(p.seller)} • ${esc(p.sellerType)}</p><p><b class="price">${money(p.price)}</b> <span class="mrp">${money(p.mrp)}</span></p><p>Stock: ${p.stock}</p><h3>Specifications</h3><p>Category: ${esc(p.category)}</p><p>Seller type: ${esc(p.sellerType)}</p><p>Delivery: location-based</p><p>Returns: seller/category policy</p><button class="btn" onclick="JB.add('${p.id}');JB.close()">Add to Cart</button>`)}
function cart(){
 const total=db.cart.reduce((a,x)=>{const p=db.products.find(p=>p.id===x.id);return a+(p?p.price*x.qty:0)},0);
 modal(`<button class="close" onclick="JB.close()">×</button><h2>🛒 Cart</h2>${db.cart.map(x=>{const p=db.products.find(p=>p.id===x.id);return p?`<div class="list-row"><span>${esc(p.name)} × ${x.qty}</span><b>${money(p.price*x.qty)}</b></div>`:""}).join("")||`<div class="empty">Cart is empty.</div>`}<hr><h3>Total ${money(total)}</h3><button class="btn" onclick="JB.checkout()">Proceed to Checkout</button>`);
}
function wishlist(){products(db.products.filter(p=>db.wishlist.includes(p.id)),"Wishlist")}
function auth(){
 modal(`<button class="close" onclick="JB.close()">×</button><h2>JANA BAZAR Account</h2>
 <div class="notice">Authentication uses Supabase when configured. Demo mode is only for UI testing.</div>
 <form class="form" onsubmit="JB.login(event)"><div class="field"><label>Email</label><input id="email" type="email" required></div><div class="field"><label>Password</label><input id="pass" type="password" required></div><button class="btn">Login</button></form>
 <div class="row"><button class="btn secondary" onclick="JB.register()">Register</button><button class="btn secondary" onclick="JB.forgot()">Forgot Password</button></div>`);
}
async function login(e){
 if(e)e.preventDefault();
 const email=$("#email").value.trim(),password=$("#pass").value;
 if(isDemo()){
   const u=db.users.find(x=>x.email===email&&x.password===password);
   if(u){db.currentUser=u;save();close();update();toast("Login successful");return}
   if(email===JB_CONFIG.demoAdmin.email&&password===JB_CONFIG.demoAdmin.password){
     const u={id:"admin",name:"Super Admin",email,role:"super_admin",verified:true};
     db.users.push(u);db.currentUser=u;save();close();update();toast("Demo admin login successful");return;
   }
   toast("Invalid demo credentials");return;
 }
 const client=window.supabase?.createClient(JB_CONFIG.supabaseUrl,JB_CONFIG.supabasePublishableKey);
 if(!client)return toast("Supabase library/config missing");
 const r=await client.auth.signInWithPassword({email,password});
 if(r.error)return toast(r.error.message);
 const role=await fetchRole(client,r.data.user.id);
 db.currentUser={id:r.data.user.id,name:r.data.user.user_metadata?.full_name||email,email,role:role||"customer"};
 save();close();update();toast("Login successful");
}
async function fetchRole(client,userId){
 try{const r=await client.from("profiles").select("role,full_name").eq("id",userId).maybeSingle();return r.data?.role||"customer"}catch(e){return "customer"}
}
function register(){modal(`<button class="close" onclick="JB.close()">×</button><h2>Create Account</h2><form class="form" onsubmit="JB.doRegister(event)"><div class="field"><label>Name</label><input name="name" required></div><div class="field"><label>Email</label><input name="email" type="email" required></div><div class="field"><label>Password</label><input name="password" type="password" minlength="8" required></div><button class="btn">Create & Verify</button></form>`)}
async function doRegister(e){
 e.preventDefault();const f=new FormData(e.target);const email=f.get("email").trim(),password=f.get("password");
 if(isDemo()){db.users.push({id:"u"+Date.now(),name:f.get("name"),email,password,role:"customer",verified:true});save();close();toast("Demo account created");return}
 const client=window.supabase?.createClient(JB_CONFIG.supabaseUrl,JB_CONFIG.supabasePublishableKey);if(!client)return toast("Configure Supabase");
 const r=await client.auth.signUp({email,password,options:{data:{full_name:f.get("name")}}});if(r.error)return toast(r.error.message);close();toast("Account created. Complete provider verification.");}
function forgot(){modal(`<button class="close" onclick="JB.close()">×</button><h2>Account Recovery</h2><form class="form" onsubmit="JB.reset(event)"><div class="field"><label>Email</label><input name="email" type="email" required></div><button class="btn">Send Recovery</button></form>`)}
async function reset(e){e.preventDefault();const email=new FormData(e.target).get("email");if(isDemo())return toast("Demo recovery: connect Supabase for real password recovery");const client=window.supabase?.createClient(JB_CONFIG.supabaseUrl,JB_CONFIG.supabasePublishableKey);if(!client)return toast("Configure Supabase");const r=await client.auth.resetPasswordForEmail(email,{redirectTo:location.href});if(r.error)return toast(r.error.message);close();toast("Recovery message sent")}
function seller(){modal(`<button class="close" onclick="JB.close()">×</button><h2>🏪 Seller Registration</h2><form class="form" onsubmit="JB.saveSeller(event)"><div class="field"><label>Business Name</label><input name="name" required></div><div class="field"><label>Seller Type</label><select name="type">${SELLER_TYPES.map(x=>`<option>${x}</option>`).join("")}</select></div><div class="field"><label>Mobile / Email</label><input name="contact" required></div><button class="btn">Submit for KYC Approval</button></form><div class="notice">OTP/KYC must be verified server-side in production.</div>`)}
function saveSeller(e){e.preventDefault();const f=new FormData(e.target);db.sellers.push({id:"s"+Date.now(),name:f.get("name"),type:f.get("type"),contact:f.get("contact"),location:db.location,status:"pending"});save();close();toast("Seller submitted for admin approval")}
function admin(){
 modal(`<button class="close" onclick="JB.close()">×</button><img src="assets/jana-bazar-admin.png" style="width:230px;max-width:100%;height:auto" alt="JANA BAZAR Admin"><h2>🔐 Admin Portal</h2>
 <div class="notice">Only a verified <b>admin</b> or <b>super_admin</b> role can open the dashboard. In production, authorization must be enforced by Supabase RLS/Edge Functions, not by browser code.</div>
 <form class="form" onsubmit="JB.adminLogin(event)"><div class="field"><label>Email</label><input id="ae" type="email" required></div><div class="field"><label>Password</label><input id="ap" type="password" required></div><button class="btn">Secure Login</button></form>
 <p class="muted">Demo: admin@janabazar.demo / Admin@123</p>`);
}
async function adminLogin(e){
 e.preventDefault();const email=$("#ae").value.trim(),password=$("#ap").value;
 if(isDemo()){
   if(email!==JB_CONFIG.demoAdmin.email||password!==JB_CONFIG.demoAdmin.password)return toast("Invalid admin credentials");
   db.currentUser={id:"admin",name:"Super Admin",email,role:"super_admin",verified:true};save();close();adminDash();update();audit("ADMIN_LOGIN","Demo admin login");return;
 }
 const client=window.supabase?.createClient(JB_CONFIG.supabaseUrl,JB_CONFIG.supabasePublishableKey);if(!client)return toast("Configure Supabase");
 const r=await client.auth.signInWithPassword({email,password});if(r.error)return toast(r.error.message);
 const role=await fetchRole(client,r.data.user.id);if(!["admin","super_admin"].includes(role)){await client.auth.signOut();return toast("Access denied: admin role required")}
 db.currentUser={id:r.data.user.id,name:email,email,role};save();close();adminDash();audit("ADMIN_LOGIN","Supabase admin login");update();
}
function audit(action,detail){db.adminAudit.unshift({id:"a"+Date.now(),time:new Date().toISOString(),actor:db.currentUser?.email||"unknown",action,detail});db.adminAudit=db.adminAudit.slice(0,200);save()}
function adminDash(){
 $("#app").innerHTML=`<div class="container"><div class="dashboard">
 <aside class="card sidebar"><img src="assets/jana-bazar-admin.png" style="width:100%;max-height:95px;object-fit:contain" alt=""><h3>Admin Control Center</h3>
 ${["Overview","Customers","Sellers / KYC","Products","Orders","Payments / Wallet","Advertising","Support","Audit Logs"].map(x=>`<button onclick="JB.adminTab('${x}')">${x}</button>`).join("")}
 <button onclick="JB.logout()">🚪 Logout</button></aside><section id="adminPanel"></section></div></div>`;
 adminTab("Overview");
}
function adminTab(t){
 if(!isAdmin()){toast("Admin authorization required");return admin()}
 const customers=db.users.filter(x=>x.role==="customer").length;
 const sellers=db.sellers.length;
 const pending=db.sellers.filter(x=>x.status==="pending").length;
 const orders=db.orders.length;
 let body="";
 if(t==="Overview")body=`<div class="stats"><div class="statbox">Customers<b>${customers}</b></div><div class="statbox">Sellers<b>${sellers}</b></div><div class="statbox">Pending KYC<b>${pending}</b></div><div class="statbox">Orders<b>${orders}</b></div></div><div class="card" style="margin-top:18px"><h2>Marketplace control center</h2><p class="muted">Admin actions below are persisted in demo storage. Production authorization belongs in backend RLS/Edge Functions.</p></div>`;
 if(t==="Customers")body=`<div class="card"><h2>Customers</h2><div class="table-wrap"><table class="table"><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr>${db.users.map(u=>`<tr><td>${esc(u.name||"-")}</td><td>${esc(u.email||"-")}</td><td>${esc(u.role)}</td><td><span class="status">${u.verified?"Verified":"Pending"}</span></td></tr>`).join("")||"<tr><td colspan=4>No users</td></tr>"}</table></div></div>`;
 if(t==="Sellers / KYC")body=`<div class="card"><h2>Seller & KYC Review</h2><div class="table-wrap"><table class="table"><tr><th>Business</th><th>Type</th><th>Location</th><th>Status</th><th>Action</th></tr>${db.sellers.map(s=>`<tr><td>${esc(s.name)}</td><td>${esc(s.type)}</td><td>${esc(s.location)}</td><td><span class="status ${s.status==="pending"?"pending":""}">${esc(s.status)}</span></td><td>${s.status==="pending"?`<button class="btn small" onclick="JB.approveSeller('${s.id}')">Approve</button>`:"—"}</td></tr>`).join("")}</table></div></div>`;
 if(t==="Products")body=`<div class="card"><div class="section-head"><h2>Catalog</h2><button class="btn" onclick="JB.addProduct()">+ Add Product</button></div><div class="table-wrap"><table class="table"><tr><th>Product</th><th>Category</th><th>Seller</th><th>Price</th><th>Stock</th><th>Action</th></tr>${db.products.map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(p.category)}</td><td>${esc(p.seller)}</td><td>${money(p.price)}</td><td>${p.stock}</td><td><button class="btn small danger" onclick="JB.deleteProduct('${p.id}')">Delete</button></td></tr>`).join("")}</table></div></div>`;
 if(t==="Orders")body=`<div class="card"><h2>Orders</h2>${db.orders.map(o=>`<div class="list-row"><span><b>${esc(o.id)}</b><br><small>${esc(o.status)}</small></span><strong>${money(o.total)}</strong></div>`).join("")||"<div class=empty>No orders yet.</div>"}</div>`;
 if(t==="Payments / Wallet")body=`<div class="card"><h2>Payments / Wallet</h2><div class="notice">No real money movement is performed in this frontend. Connect a PCI-compliant gateway and server-side verification/webhooks.</div><p>Demo wallet balances are stored locally only.</p></div>`;
 if(t==="Advertising")body=`<div class="card"><h2>Advertising</h2><p>Create campaigns, then move approval/billing/impression tracking to backend services.</p><button class="btn" onclick="JB.advertising()">Open Advertising Center</button></div>`;
 if(t==="Support")body=`<div class="card"><h2>Support</h2>${db.tickets.map(x=>`<div class="list-row"><span>${esc(x.subject)}</span><span class="status">${esc(x.status||"open")}</span></div>`).join("")||"<div class=empty>No tickets.</div>"}</div>`;
 if(t==="Audit Logs")body=`<div class="card"><h2>Audit Logs</h2><div class="table-wrap"><table class="table"><tr><th>Time</th><th>Actor</th><th>Action</th><th>Detail</th></tr>${db.adminAudit.map(a=>`<tr><td>${new Date(a.time).toLocaleString()}</td><td>${esc(a.actor)}</td><td>${esc(a.action)}</td><td>${esc(a.detail)}</td></tr>`).join("")||"<tr><td colspan=4>No audit events.</td></tr>"}</table></div></div>`;
 $("#adminPanel").innerHTML=body;
}
function approveSeller(id){if(!isAdmin())return toast("Unauthorized");const s=db.sellers.find(x=>x.id===id);if(s){s.status="approved";audit("SELLER_APPROVED",s.name);adminTab("Sellers / KYC");toast("Seller approved")}}
function addProduct(){modal(`<button class="close" onclick="JB.close()">×</button><h2>Add Product</h2><form class="form" onsubmit="JB.saveProduct(event)"><div class="field"><label>Name</label><input name="name" required></div><div class="field"><label>Category</label><select name="category">${CATS.filter(x=>x!=="All").map(x=>`<option>${x}</option>`).join("")}</select></div><div class="two"><div class="field"><label>MRP</label><input name="mrp" type="number" required></div><div class="field"><label>Selling Price</label><input name="price" type="number" required></div></div><div class="field"><label>Stock</label><input name="stock" type="number" required></div><button class="btn">Save Product</button></form>`)}
function saveProduct(e){e.preventDefault();if(!isAdmin())return toast("Unauthorized");const f=new FormData(e.target);db.products.push({id:"p"+Date.now(),name:f.get("name"),category:f.get("category"),mrp:Number(f.get("mrp")),price:Number(f.get("price")),stock:Number(f.get("stock")),seller:"JANA BAZAR",sellerType:"Brand",rating:0,reviews:0,icon:"🛍️"});save();close();audit("PRODUCT_CREATED",f.get("name"));adminTab("Products");toast("Product added")}
function deleteProduct(id){if(!isAdmin())return toast("Unauthorized");db.products=db.products.filter(p=>p.id!==id);save();audit("PRODUCT_DELETED",id);adminTab("Products");toast("Product deleted")}
function advertising(){ $("#app").innerHTML=`<div class="container"><div class="card"><img src="assets/jana-bazar-shop.png" style="width:220px;max-width:100%" alt=""><h2>Advertising Center</h2><p class="muted">Campaign submission interface. Billing and ad delivery require backend services.</p><button class="btn" onclick="toast('Campaign queued in demo mode')">Create Campaign</button></div></div>`}
function local(){products(db.products.filter(p=>p.sellerType!=="Brand"),"Local Commerce")}
function services(){$("#app").innerHTML=`<div class="container"><img src="assets/jana-bazar-services.png" style="width:260px;max-width:100%" alt=""><h1>Services</h1><div class="grid">${["Electrician","Plumber","AC Service","Computer Repair","Home Cleaning","Painter","Vehicle Assistance","CCTV Installation"].map(x=>`<div class="card"><h3>${x}</h3><p class="muted">Verified-provider workflow.</p><button class="btn small" onclick="toast('Booking flow opened')">Book Service</button></div>`).join("")}</div></div>`}
function b2b(){$("#app").innerHTML=`<div class="container"><img src="assets/jana-bazar-b2b.png" style="width:260px;max-width:100%" alt=""><h1>B2B Marketplace</h1><p class="muted">Manufacturer → Distributor → Dealer → Wholesaler → Retailer.</p><div class="grid">${db.products.filter(p=>p.category==="B2B / Wholesale"||["National Distributor","Regional Distributor","Wholesaler"].includes(p.sellerType)).map(productCard).join("")}</div></div>`}
function utilities(){$("#app").innerHTML=`<div class="container"><img src="assets/jana-bazar-utilities.png" style="width:260px;max-width:100%" alt=""><h1>Utilities</h1><div class="grid"><div class="card"><h3>📱 Recharge & Bills</h3><p>Provider integration required.</p></div><div class="card"><h3>🚘 FASTag</h3><p>Provider integration required.</p></div><div class="card"><h3>🔥 LPG Services</h3><p>Provider integration required.</p></div></div></div>`}
function wallet(){$("#app").innerHTML=`<div class="container"><img src="assets/jana-bazar-utilities.png" style="width:260px;max-width:100%" alt=""><div class="card"><h1>JANA Wallet</h1><h2>${money(db.wallet.balance)}</h2><p class="muted">Demo balance only. Real wallet money requires regulated/payment infrastructure and server-side ledger controls.</p></div></div>`}
function support(){$("#app").innerHTML=`<div class="container"><h1>Support</h1><div class="card"><p>Raise a support ticket.</p><button class="btn" onclick="db.tickets.push({id:'t'+Date.now(),subject:'Customer support request',status:'open'});save();toast('Ticket created')">Create Ticket</button></div></div>`}
function policies(){$("#app").innerHTML=`<div class="container"><h1>Policies</h1><div class="card"><p>Marketplace terms, seller policies, returns, privacy and grievance workflows belong here. Publish final legal text before production.</p></div></div>`}
function checkout(){if(!db.currentUser)return auth();if(!db.cart.length)return toast("Cart is empty");modal(`<button class="close" onclick="JB.close()">×</button><h2>Checkout</h2><div class="notice">COD demo only. Real UPI/Card/Wallet payments require a secure backend and verified webhooks.</div><button class="btn" onclick="JB.placeDemoOrder()">Place Demo Order</button>`)}
function placeDemoOrder(){const total=db.cart.reduce((a,x)=>{const p=db.products.find(p=>p.id===x.id);return a+(p?p.price*x.qty:0)},0);db.orders.unshift({id:"JB"+Date.now().toString().slice(-8),user:db.currentUser?.id||"demo",total,status:"PLACED",date:new Date().toISOString()});db.cart=[];save();close();update();toast("Demo order placed")}
function orders(){if(!db.currentUser)return auth();const list=db.orders.filter(o=>o.user===db.currentUser.id);$("#app").innerHTML=`<div class="container"><h1>My Orders</h1><div class="card">${list.map(o=>`<div class="list-row"><span>${esc(o.id)}<br><small>${new Date(o.date).toLocaleString()}</small></span><b>${money(o.total)}</b></div>`).join("")||"<div class=empty>No orders yet.</div>"}</div></div>`}
async function logout(){if(JB_CONFIG.supabaseUrl&&window.supabase){try{await window.supabase.createClient(JB_CONFIG.supabaseUrl,JB_CONFIG.supabasePublishableKey).auth.signOut()}catch(e){}}db.currentUser=null;save();update();location.hash="home";toast("Logged out")}
function route(){const r=location.hash.slice(1)||"home";if(r==="home")home();else if(r==="products")products();else if(r==="cart")cart();else if(r==="wishlist")wishlist();else if(r==="orders")orders();else if(r==="seller")seller();else if(r==="admin")isAdmin()?adminDash():admin();else if(r==="advertising")advertising();else if(r==="local")local();else if(r==="services")services();else if(r==="b2b")b2b();else if(r==="utilities")utilities();else if(r==="wallet")wallet();else if(r==="support")support();else if(r==="policies")policies();else home()}

window.JB={add,product,cart,wish,wishlist,auth,login,register,forgot,reset,seller,admin,adminLogin,adminDash,adminTab,approveSeller,addProduct,saveProduct,deleteProduct,advertising,checkout,placeDemoOrder,logout,close,search,filter,services,b2b,utilities,wallet,support,policies};
$("#searchBtn").onclick=()=>search($("#search").value);
$("#search").onkeydown=e=>{if(e.key==="Enter")search(e.target.value)};
$("#loginBtn").onclick=auth;
$("#locationBtn").onclick=()=>{modal(`<button class="close" onclick="JB.close()">×</button><h2>Choose Location</h2><div class="field"><input id="loc" value="${esc(db.location)}"></div><button class="btn" onclick="db.location=$('#loc').value.trim()||'Visakhapatnam';save();update();JB.close();JB.home?.()">Save</button>`)};
window.onhashchange=route;
renderCats();update();route();
})();