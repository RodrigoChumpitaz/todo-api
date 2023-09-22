import { Todo } from "../model/todo.entity";
import { TodoRepository } from "../modules/todo/domain/todo.repository";

export class TodoService{
    private repository: TodoRepository;

    constructor(repository: TodoRepository){
        this.repository = repository;
    }

    async getAll(){
        return await this.repository.getAll();
    }

    async getById(id: string){
        return await this.repository.getById(id);
    }

    async insert(todo: Todo){
        return await this.repository.insert(todo);
    }

    async update(id: string, obj: Partial<Todo>){
        return await this.repository.update(id, obj);
    }

    async disable(id: string){
        return await this.repository.disable(id);
    }

    async delete(id: string){
        return await this.repository.delete(id);
    }
}