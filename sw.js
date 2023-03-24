var CACHE_NAME = 'version1'; // bump this version when you make changes.
// Put all your urls that you want to cache in this array
var urlsToCache = [
    'audio.html',
    'discretion.html',
    'index.html',

    'linked/200.html',
    'linked/fate.html',
    'linked/links.html',
    'linked/video.html',

    'js/jquery-3.3.1.min.js',
    'js/type.js',
    'js/visualizer.js',

    'css/style.css',

    'assets/audios/200.mp3',
    'assets/audios/AudioLogBegin.mp3',
    'assets/audios/TheFateOfLiquidators.mp3',
    'assets/audios/Warning.mp3',

    'assets/logo-192.png',
    'assets/logo-512.png',

    'assets/images/3828.jpg',
    'assets/images/ControlCenter.jpg',
    'assets/images/DeconstructionOfVillages.jpg',
    'assets/images/FalloutRadius.jpg',
    'assets/images/FlightOverChernobly.jpg',
    'assets/images/HelicopterCrash.png',
    'assets/images/InsideChernobly.jpg',
    'assets/images/Liquidators.jpg',
    'assets/images/LiquidatorsOfChernobyl.jpg',
    'assets/images/MixedMedia.jpg',
    'assets/images/NeverBefore.jpg',
    'assets/images/PCPEvacuation.jpg',
    'assets/images/RoofCleaning.png',
    'assets/images/RoomCleanUp.jpg',
    'assets/images/TerminalCall.png',
    'assets/images/TerminalClassified.jpg',
    'assets/images/TerminalRadiationLevelsBlue.jpg',
    'assets/images/TerminalRadiationLevelsRed.jpg',


    
];

// Install the service worker and open the cache and add files mentioned in array to cache
self.addEventListener('install', function(event) {
    event.waitUntil(
    caches.open(CACHE_NAME)
        .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});


// keep fetching the requests from the user
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) return response;
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = []; // add cache names which you do not want to delete
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        );
        })
    );
});

