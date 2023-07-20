import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import fileStore from 'session-file-store';
import connection from './configSQL';       // config for connecting to SQL
import routerDB from './routes/routesMongoDB';
import routerFile from './routes/routesFile';
import routerSQL from './routes/routesSQL';
 
declare module 'express-session' {
    export interface Session {
        login: string,
        pass: string
    }
}

//const DB_URL = 'mongodb+srv://irynaK:GVxRvOmBbDL9j9X7@cluster0.z64fguw.mongodb.net/?retryWrites=true&w=majority';
const DB_URL = 'mongodb://127.0.0.1:27017';       // local database Mongo Compass
const app = express();
const PORT = 3005;

const FileStore = fileStore(session);
app.use(session({
    store: new FileStore({ logFn: function () { } }),
    secret: 'thisismysecretkey',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'));

async function startWork() {
    try {
        // if you want save to MongoDB

        //  app.use(routerDB);
        //  await mongoose.connect(DB_URL).then(() => console.log('Connected to MONGO database'));

        // if you want SQL

        // app.use(routerSQL);
        // connection.connect((err) => {
        //     if (err) {
        //         console.log('Error connection ' + err);
        //     } else {
        //         console.log('Connection to SQL database created!');
        //     }
        // });

        //  if you want save to file 

     app.use(routerFile);

        app.listen(PORT, () => console.log('Listening on ' + PORT));
    } catch (error) {
        console.log(error);
    }
}
startWork();

