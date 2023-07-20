import { Request, Response } from 'express';
import User from '../../models/modelForFile';
import WorkWithFile from '../../workFile';

class AutorizationControllerFile {
    async login(req: Request, res: Response) {
        let userLogin = req.body.login;
        let password = req.body.pass;
        try {
            let users: User[] = WorkWithFile.readUsersFromFile();
            const user = users?.find(el => {
                if (el.login == userLogin) {
                    return el;
                }
            });
            if (!user) {
                res.status(401).send({ error: `User '${userLogin}' not found` });
            } else if (user && password !== user.pass) {
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
        let userLogin = req.body.login;
        let password = req.body.pass;
        const newUser: User = { login: userLogin, pass: password, items: [] };
        try {
            let users: User[] = WorkWithFile.readUsersFromFile();
            if (users !== undefined) {
                const user = users?.find(el => {
                    if (el.login == userLogin) {
                        return el;
                    }
                });
                if (user?.login == newUser.login) {
                    res.status(400).send({ error: `Such user '${userLogin}' already exist` });
                } else {
                    WorkWithFile.addNewUserToFile(newUser, users);
                    req.session.login = userLogin;
                    res.send(JSON.stringify({ "ok": true }));
                }
            }else{
                WorkWithFile.writeNewUserToFile(newUser);
                req.session.login = userLogin;
                res.send(JSON.stringify({ "ok": true }));
            }

        } catch (error) {
            res.status(500).send({ error: error })
        }
    }

    logout(req: Request, res: Response) {
        req.session.destroy(err => { })
        res.send(JSON.stringify({ "ok": true }));
    }
}

export default new AutorizationControllerFile();