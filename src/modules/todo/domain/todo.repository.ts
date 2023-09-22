import { Todo } from "../../../model/todo.entity";

export interface TodoRepository{
    getAll(): Promise<Todo[] | Error>;
    getById(id: string): Promise<Partial<Todo> | Error>;
    insert(todo: Todo): Promise<void | Error>;
    update(id: string, obj: Partial<Todo>): Promise<any | Error>;
    disable(id: string): Promise<void | Error>;
    delete(id: string): Promise<void | Error>;
}