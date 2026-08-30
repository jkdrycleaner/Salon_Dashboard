const CACHE_NAME='yours-salon-dashboard-v14';
const APP_SHELL='./Dashboard_2808_14.html';
self.addEventListener('install',e=>e.waitUntil(
  caches.open(CACHE_NAME).then(c=>c.addAll([
    APP_SHELL,'./dashboard-manifest.json','./icon-192.png','./icon-512.png'
  ])).then(()=>self.skipWaiting())
));
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  if(e.request.mode==='navigate' || e.request.destination==='document'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(
      ()=>caches.match(e.request).then(x=>x||caches.match(APP_SHELL))
    ));
    return;
  }
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));
});
