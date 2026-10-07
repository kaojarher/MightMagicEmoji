const V='tianming-v1',CORE=['./','index.html','manifest.webmanifest','lib/three.min.js','lib/rot.min.js','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png'],
AUD=['town','field','dungeon','battle','boss'].map(n=>'audio/'+n+'.mp3');
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);await Promise.allSettled(AUD.map(u=>c.add(u)))}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
async function ranged(req,res){const b=await res.arrayBuffer(),m=/bytes=(\d*)-(\d*)/.exec(req.headers.get('range')),s=m[1]?+m[1]:0,e=m[2]?Math.min(+m[2],b.byteLength-1):b.byteLength-1;
 return new Response(b.slice(s,e+1),{status:206,statusText:'Partial Content',headers:{'Content-Type':res.headers.get('Content-Type')||'audio/mpeg','Content-Range':`bytes ${s}-${e}/${b.byteLength}`,'Content-Length':e-s+1}})}
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith((async()=>{const c=await caches.open(V),hit=await c.match(r,{ignoreSearch:true}),code=/\.(html|webmanifest)$|\/$/.test(new URL(r.url).pathname)||r.mode==='navigate';
  if(r.headers.has('range')){const full=hit||await c.match(r.url.split('?')[0]);if(full)return ranged(r,full);return fetch(r)}
  if(hit&&!code)return hit;
  try{const n=await fetch(r);if(n.ok&&n.status===200)c.put(r,n.clone());return n}catch(err){if(hit)return hit;if(r.mode==='navigate')return c.match('index.html');throw err}})())});
