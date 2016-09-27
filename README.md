# Embark
Front end project for planner.

Setup steps:

1, run `npm install`
2, launch server with 'node server.js'
3, run `npm run build`
4, delete all files from existing public/ folder, and copy the content of /build into /public
5, go into app/config/, based on the environment, copy either of this file and rename it to config.js
6, set the env port number: use port 80 for prod, and 3000 for all others
7, visit localhost:3000