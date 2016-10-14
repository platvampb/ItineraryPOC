# Embark
Front end project for planner.

Setup steps:

1. go into app/config/, based on the environment, copy either of these files and rename it to config.js

2. run `npm install`

3. run `npm run build`

4. launch server with 'node server.js'

5. delete all files from existing public/ folder, and copy the content of /build into /public

6. set the env port number: use port 80 for prod, and 3000 for all others

7. visit localhost:{port}