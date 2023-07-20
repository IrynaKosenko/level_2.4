import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import User from '../../models/modelForMongoDB';

const saltRounds = 10;

class AutorizationControllerDB {
    
    async login(req: Request, res: Response) {
        let userLogin = req.body.login;
        let password = req.body.pass;
        try {
            const user = await User.findOne({ login: userLogin });
            if (!user) {
                res.status(401).send({ error: `User '${userLogin}' not found` });
            } else if (user &&  !(bcrypt.compareSync(password, user.pass))) {
                res.status(401).send({ error: `User '${userLogin}' found but password is incorrect.` })
            } else {
                req.session.login = userLogin;
                res.send(JSON.stringify({ "ok": true }));
            }
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }

    async register(req: Request, res: Response) {
        let username = req.body.login;
        let password = req.body.pass;
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        const newUser = { login: username, pass: hashPassword, items: [] };
        try {
            const user = await User.findOne(newUser);
            if (user) {
                res.status(400).send({ error: `Such user '${username}' already exist` });
            } else {
                User.create(newUser).then(() => {
                    res.send(JSON.stringify({ "ok": true }));
                });
            }
        } catch (error) {
            res.status(500).send({ error: 'Error database' })
        }
    }

    logout(req: Request, res: Response) {
        req.session.destroy(err => { })
        res.send(JSON.stringify({ "ok": true }));
    }
}

export default new AutorizationControllerDB();