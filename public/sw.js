var cacheName = "V1";
var cacheFiles = [
    '../../../CourseWork2_VUE/',
    '../../../CourseWork2_VUE/public/images/abacus-1866497_640.jpg',
    '../../../CourseWork2_VUE/public/images/chemistry-2938901_640.jpg',
    '../../../CourseWork2_VUE/public/images/chemistry-740453_640.jpg',
    '../../../CourseWork2_VUE/public/images/geometry-1044090_640.jpg',
    '../../../CourseWork2_VUE/public/images/logo.png',
    '../../../CourseWork2_VUE/public/images/math-1547018_640png',
    '../../../CourseWork2_VUE/public/images/zodiac-29420_640.png'
]

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    console.log("[Service Worker] Installed");

    return self.skipWaititng();
    
    /*e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(cacheFiles);
      })
    );*/
  });

  self.addEventListener('activate', function(e){
    console.log("[serviceworker] Activated")

    e.waitUntil(
        caches.keys().then(function(CachesNames){
            return Promise.all(CachesNames.map(function(thisCacheName){

              if (thisCacheName !== cacheName){
                  console.log("[serviceworker] Removing cached files from", thisCacheName);
                  return caches.delete(thisCacheName);
              }
            }))
        })
    )
})

self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(cacheRes => {
        //console.log('[Service Worker] Fetching resource: '+e.request.url);
        return cacheRes || fetch(e.request);
      })
    );
    console.log("[serviceWorker] fetching.......");

  });

  console.log('service worker loaded.....');

  self.addEventListener('push', e => {
      const data = e.data.json();
      console.log('push Recieved....');
      self.ServiceWorkerRegistration.showNotificatiion(data.title,{
          body: 'notified by Etinosa',
          icon: '../../../CourseWork2_VUE/public/images/logo.png'
      });
  });

