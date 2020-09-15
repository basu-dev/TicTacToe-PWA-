const cacheName='vw';
const cacheAssets=[
    'index.html',
    'site.css',
    'main.js',
    'images/144.png',
    'sw.js'
   
]
self.addEventListener('install',(e)=>{
    // e.waitUntil(caches.open(cacheName)
    //     .then(cache=>{
    //         console.log("Service Worker Caching ") 
    //         cache.addAll(cacheAssets).then(e=>{console.log(e)})
    //     })
    //     .then(()=>self.skipWaiting())
    // )
})
self.addEventListener('activate',(e)=>{

    console.log("Service Workder Activated")
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

self.addEventListener('fetch',(e)=>{
    console.log("Fetching")
    e.respondWith(
        fetch(e.request)
        .then(res=>{
            console.log(res)
            let resClone=res.clone();
            caches.open(cacheName).then(cache=>{
                cache.put(e.request,resClone)
            }).catch(err=>console.log("Caching Error ",err))
        return res
        }
        )
        .catch((err)=>{
            console.log("Need To Fetch From Cache   ")
            caches.match(e.request).catch(b=>{
                console.log("Error",b)
            })
            
            
        }
        )
    ) 
})
