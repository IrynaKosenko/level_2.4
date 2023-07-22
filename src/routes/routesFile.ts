import express from 'express';
import TaskControllerFile from '../controllers/fileController/tasks'
import AutorizationControllerFile from '../controllers/fileController/autorization'
import cors from 'cors';

const routerFile = express.Router();
routerFile.use(express.json());

// routerFile.use(cors({
//     origin: 'http://localhost:8080',
//     credentials: true,                    // cookies allows
// }));

routerFile.get('/api/v1/items', TaskControllerFile.getAllTask);
routerFile.post('/api/v1/items', TaskControllerFile.createNewTask);
routerFile.put('/api/v1/items', TaskControllerFile.updateTask);
routerFile.delete('/api/v1/items', TaskControllerFile.deleteOne);
routerFile.post('/api/v1/login', AutorizationControllerFile.login);
routerFile.post('/api/v1/logout', AutorizationControllerFile.logout);
routerFile.post('/api/v1/register', AutorizationControllerFile.register);


routerFile.post('/api/v2/router', (req, res) => {
    let query: string = req.query.action as string
    switch (query) {
        case 'login': {
            AutorizationControllerFile.login(req, res)
            break;
        }
        case 'logout': {
            AutorizationControllerFile.logout(req, res)
            break;
        }
        case 'register': {
            AutorizationControllerFile.register(req, res)
            break;
        }
        case 'getItems': {
            TaskControllerFile.getAllTask(req, res)
            break;
        }
        case 'deleteItem': {
            TaskControllerFile.deleteOne(req, res)
            break;
        }
        case 'createItem': {
            TaskControllerFile.createNewTask(req, res)
            break;
        }
        case 'editItem': {
            TaskControllerFile.updateTask(req, res)
            break;
        }
        default: res.status(400).send({ error: `Unknown request command: ${query}` })
    }
});

export default routerFile;
