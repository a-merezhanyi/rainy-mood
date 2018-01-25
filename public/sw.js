/*eslint-disable */
"use strict";
importScripts("sw-toolbox.js"); toolbox.precache(["index.html"]); toolbox.router.get("[*.jpg|*.mp3]", toolbox.cacheFirst); toolbox.router.get("/*", toolbox.networkFirst, { networkTimeoutSeconds: 5});
