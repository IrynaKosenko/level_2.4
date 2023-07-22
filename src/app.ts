import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import fileStore from 'session-file-store';
import connection from './configSQL';          // config for connecting to SQL
import routerDB from './routes/routesMongoDB';
import routerFile from './routes/routesFile';
import routerSQL from './routes/routesSQL';

declare module 'express-session' {
    export interface Session {
        login: string,
        pass: string
    }
}
const app = express();

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

        app.use(routerDB);
         await mongoose.connect(process.env.DB_MONGO as string)
         .then(() => console.log('Connected to MONGO database'));

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

        //app.use(routerFile);

        app.listen(process.env.PORT, () => console.log('Listening on ' + process.env.PORT));
    } catch (error) {
        console.log(error);
    }
}
startWork();

