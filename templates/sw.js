var cacheName = "V1";
var cacheFiles = [
    '/',
    '../static/style.css',
    '../static/style2.css',
    '../static/login.css',
    '../images/logo.png',
    './templates/icons',
    './templates/images',
    './templates/static',
    './templates/',
    './template/adminPage.html',
    './template/index.html',
    './template/register.html',
    './template/userPage.html',
    './template/app.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.4.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'
]

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    console.log("[Service Worker] Installed");

    return self.skipWaititng();
    
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
          icon: '/templates/images/logo.png'
      });
  });

