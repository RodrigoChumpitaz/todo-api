import { Request, Response } from "express";
import { TodoInfraestructure } from "./todo.infraestructure";
import { TodoService } from "../../services/todo.service";
import { ITodoInsert } from "../../core/interfaces/todo.interface";
import { Todo } from "../../model/todo.entity";

const todoInfraestructure = new TodoInfraestructure();
const todoService = new TodoService(todoInfraestructure);

export default class TodoController {

    constructor(){
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.disable = this.disable.bind(this);
    }

    async getAll(req: Request,  res: Response){
        const todos = await todoService.getAll();
        return res.status(200).json(todos)
    }

    async getById(req: Request,  res: Response){
        const { id } = req.params;
        const todo = await todoService.getById(id);
        if(todo instanceof Error) return res.status(400).json({ message: todo.message });
        return res.status(200).json(todo);
    }

    async insert(req: Request,  res: Response){
        const { title, description, status }: ITodoInsert = req.body;
        const newTodo = new Todo({title, description, status});
        await todoService.insert(newTodo);
        return res.status(200).json({
            message: 'Todo saved successfully'
        });
    }

    async update(req: Request,  res: Response){
        const { title, description, status }: ITodoInsert = req.body;
        const { id } = req.params;
        const todoUpdated = await todoService.update(id, { title, description, status });
        return res.status(200).json({
            message: 'Todo updated successfully',
            data: todoUpdated
        });
    }

    async disable(req: Request,  res: Response){
        const { id } = req.params;
        const todoDisabled = await todoService.disable(id);

        if(todoDisabled instanceof Error) return res.status(400).json({ message: todoDisabled.message });

        return res.status(200).json({
            message: 'Todo disabled successfully'
        });
    }

    async delete(req: Request,  res: Response){
        const { id } = req.params;
        const todoDeleted = await todoService.delete(id);

        if(todoDeleted instanceof Error) return res.status(400).json({ message: todoDeleted.message });

        return res.status(200).json({
            message: 'Todo deleted successfully'
        });
    }
}

