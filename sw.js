const C='mushaf-v1.0.1',F=['./','index.html','logo.svg','manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='mushaf-audio').map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET'||r.url.includes('everyayah.com'))return;
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(n=>{if(n.ok){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n}).catch(()=>caches.match('index.html'))));
});
