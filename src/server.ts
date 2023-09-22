import express, { Application } from 'express';
import morgan from 'morgan';
import todoRoutes from './modules/todo/todo.routes';

class App{
    public app: Application;

    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use('/api/v1/todo', todoRoutes)
    }
}

export default new App().app;