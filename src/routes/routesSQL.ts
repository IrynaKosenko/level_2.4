import express from 'express';
import cors from 'cors';
import taskControllerSQL  from '../controllers/SQLController/tasks'
import autorizationControllerSQL from '../controllers/SQLController/autorization'

const routerSQL = express.Router();
routerSQL.use(express.json());

routerSQL.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,                    // cookies allows
}));

routerSQL.get('/api/v1/items', taskControllerSQL.getAllTask);
routerSQL.post('/api/v1/items', taskControllerSQL.createNewTask);
routerSQL.put('/api/v1/items', taskControllerSQL.updateTask);
routerSQL.delete('/api/v1/items', taskControllerSQL.deleteOne);
routerSQL.post('/api/v1/login', autorizationControllerSQL.login );
routerSQL.post('/api/v1/logout', autorizationControllerSQL.logout);
routerSQL.post('/api/v1/register', autorizationControllerSQL.register);

routerSQL.post('/api/v2/router', (req, res) => {
    let query: string = req.query.action as string
    switch (query) {
        case 'login': {
            autorizationControllerSQL.login(req, res)
            break;
        }
        case 'logout': {
            autorizationControllerSQL.logout(req, res)
            break;
        }
        case 'register': {
            autorizationControllerSQL.register(req, res)
            break;
        }
        case 'getItems': {
            taskControllerSQL.getAllTask(req, res)
            break;
        }
        case 'deleteItem': {
            taskControllerSQL.deleteOne(req, res)
            break;
        }
        case 'createItem': {
            taskControllerSQL.createNewTask(req, res)
            break;
        }
        case 'editItem': {
           taskControllerSQL.updateTask(req, res)
            break;
        }
        default: res.status(400).send({ error: `Unknown request command: ${query}` })
    }
});

export default routerSQL;
