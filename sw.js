const cacheName='vw';
const cacheAssets=[
    'index.html',
    'site.css',
    'main.js',
    'images/144.png',
    'favicon.ico'
]
self.addEventListener('install',(e)=>{
    e.waitUntil(caches.open(cacheName)
        .then(cache=>{
            cache.addAll(cacheAssets)
        })
        .then(()=>self.skipWaiting())
    )
})
self.addEventListener('activate',(e)=>{

    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(cacheNames.map(cache=>{
                if(cache!==cacheName){
                    //clear caceh
                    return caches.delete(cache)
                }
            }
                
            ))
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
          })
    );
  });
