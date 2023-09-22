import { Router } from "express";
import TodoController from "./todo.controller";

class TodoRoute{
    router: Router;
    controller: TodoController
    constructor(){
        this.router = Router();
        this.controller = new TodoController();
        this.routes();
    }

    routes(){
        this.router.get('/get', this.controller.getAll)
        this.router.get('/get/:id', this.controller.getById)
        this.router.post('/add', this.controller.insert)
        this.router.patch('/update/:id', this.controller.update)
        this.router.patch('/disable/:id', this.controller.disable)
        this.router.delete('/delete/:id', this.controller.delete)
    }
}

export default new TodoRoute().router;