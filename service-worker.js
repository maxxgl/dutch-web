"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/dutch-web/index.html","7ec7bd22c16ba858415ef74535f9c593"],["/dutch-web/static/css/main.2c077819.css","60b61ef206f181c03888ed50d53cf264"],["/dutch-web/static/js/main.1cd3db03.js","07e64997f4e9ab048e5bf799a704ddf3"],["/dutch-web/static/media/SZA.3da61b04.jpg","3da61b04745cde886f3568496677e8d0"],["/dutch-web/static/media/circle.f6be2cb6.svg","f6be2cb6762456b04c6dbb55a8376117"],["/dutch-web/static/media/circle_green.cf3ad52a.svg","cf3ad52a4e985d87db28fce514dd4595"],["/dutch-web/static/media/date_icon.71076418.svg","7107641815038649116bd77efb4c6082"],["/dutch-web/static/media/findlocation_icon.3afb9d0c.svg","3afb9d0cf4898f3c900d66fc9795756b"],["/dutch-web/static/media/girl.a60eac34.jpg","a60eac34d1839525920f0789bba5e682"],["/dutch-web/static/media/logotype_green.2413baaf.svg","2413baaf133daba20e10a347b3f2fdeb"],["/dutch-web/static/media/logotype_white.4f907381.svg","4f90738197561d221f63811bdfccc226"],["/dutch-web/static/media/man_icon.45dc243e.svg","45dc243ea0a5f750ed870800ef7ae7e3"],["/dutch-web/static/media/meg.fffb178d.jpg","fffb178d0648cc11b8c231c30bf7891d"],["/dutch-web/static/media/next_icon.d821f184.svg","d821f18448cacd426117e72b53d4b543"],["/dutch-web/static/media/next_icon_blue.0ddf90a7.svg","0ddf90a7ee4f6c7f186695da28c8f885"],["/dutch-web/static/media/reschedule_icon.3bc97eab.svg","3bc97eaba72bfd1428bca017b057fc51"],["/dutch-web/static/media/shakira.22caf87e.jpg","22caf87edd2c790434e1b5d19ec59f8a"],["/dutch-web/static/media/snow-girl.8cb24419.jpg","8cb24419bdb9bff98f2e93d1de63cfc4"],["/dutch-web/static/media/splash_bk.2b5a65dd.svg","2b5a65dd7f41a26576a69faae22a1db7"],["/dutch-web/static/media/trans_icon.6914e9ff.svg","6914e9ff9f22cd504c8422bc6125916c"],["/dutch-web/static/media/woman_icon.b0d02ac0.svg","b0d02ac0a239f2a81bc11aa92cda15d3"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/dutch-web/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});