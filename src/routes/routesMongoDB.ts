import express from 'express';
import TaskControllerDB from '../controllers/mongoDBController/tasks'
import AutorizationControllerDB from '../controllers/mongoDBController/autorization'
import cors from 'cors';

const routerDB = express.Router();
routerDB.use(express.json());

// routerDB.use(cors({
//         origin: 'http://localhost:8080',
//         credentials: true,                    // cookies allows
//     }));

routerDB.get('/api/v1/items', TaskControllerDB.getAllTask);
routerDB.post('/api/v1/items', TaskControllerDB.createNewTask);
routerDB.put('/api/v1/items', TaskControllerDB.updateTask);
routerDB.delete('/api/v1/items', TaskControllerDB.deleteOne);
routerDB.post('/api/v1/login', AutorizationControllerDB.login);
routerDB.post('/api/v1/logout', AutorizationControllerDB.logout);
routerDB.post('/api/v1/register', AutorizationControllerDB.register);

routerDB.post('/api/v2/router', (req, res) => {
    let query: string = req.query.action as string
    switch (query) {
        case 'login': {
            AutorizationControllerDB.login(req, res)
            break;
        }
        case 'logout': {
            AutorizationControllerDB.logout(req, res)
            break;
        }
        case 'register': {
            AutorizationControllerDB.register(req, res)
            break;
        }
        case 'getItems': {
            TaskControllerDB.getAllTask(req, res)
            break;
        }
        case 'deleteItem': {
            TaskControllerDB.deleteOne(req, res)
            break;
        }
        case 'createItem': {
            TaskControllerDB.createNewTask(req, res)
            break;
        }
        case 'editItem': {
            TaskControllerDB.updateTask(req, res)
            break;
        }
        default: res.status(400).send({ error: `Unknown request command: ${query}` })
    }
});

export default routerDB;
