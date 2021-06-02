# mern-stack-example
Mern Stack code for the Mern Tutorial

## How To Run
Create an Atlas URI connection parameter in `mern/server/config.env` with your Atlas URI:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT=3000
```

Start server:
```
cd mern/server
npm install
npm install -g nodemon
nodemon server
```

Start Web server
```
cd mern/client
npm install
npm start
```

## Disclaimer

Use at your own risk; not a supported MongoDB product
