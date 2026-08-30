const CACHE_NAME='yours-salon-dashboard-v10';
const APP_SHELL='./Dashboard_2808_10.html';
self.addEventListener('install',e=>e.waitUntil(
  caches.open(CACHE_NAME).then(c=>c.addAll([
    APP_SHELL,'./dashboard-manifest.json','./icon-192.png','./icon-512.png'
  ])).then(()=>self.skipWaiting())
));
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
  .then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
    if(r&&r.ok){const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));}
    return r;
  }).catch(()=>cached)));
});
