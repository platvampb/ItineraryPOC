# Embark
Front end project for planner.

Dev Setup steps:

1. run `npm install`

2. go into app/config/, based on the environment, copy either of this file and rename it to config.js

3. run `npm start`

4. visit localhost:8080


Deployment steps:

1. go into app/config/, based on the environment, copy either of these files and rename it to config.js

2. run `npm install`

3. run `npm run build`

4. launch server with 'node server.js'

5. in the public/ folder, replace index.html with index_prod.html

6. go into app/config/, based on the environment, copy either of this file and rename it to config.js

7. set the env port number: use port 80 for prod, or any other port otherwise.

8. visit localhost:{port}
