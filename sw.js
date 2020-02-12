var cacheName = "V1";
var cacheFiles = [
    '/',
    '../../../CourseWork2_VUE',
    './templates/static/style.css',
    './templates/static/style2.css',
    '../static/login.css',
    '../images/logo.png',
    './templates/icons',
    './templates/images',
    './templates/static',
    './templates/template',
    './template/adminPage.html',
    './template/index.html',
    './template/register.html',
    './template/userPage.html',
    './template/app.js',
    '<meta charset="UTF-8">',
    '<link rel="stylesheet" href= "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity= "sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">',
    '<link rel="stylesheet" type="text/css" href="../static/login.css">',
    '<link rel="stylesheet" href="./public/static/style.css">',
    '<link rel="stylesheet" href="./public/static/style2.css">',
    'viewport" content="width=device-width, initial-scale=1.0',
    'https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymou',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous',
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

