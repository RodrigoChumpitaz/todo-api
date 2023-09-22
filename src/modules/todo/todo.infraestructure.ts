import { Todo } from "../../model/todo.entity";
import DatabaseBootstrap from "../../server/database.bootstrap";
import { TodoRepository } from "./domain/todo.repository";

export class TodoInfraestructure implements TodoRepository{
    async getAll(): Promise<Todo[] | Error> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(Todo);
            return await dbRepository.find();
        } catch (error) {
            return new Error(error);
        }    
    }
    
    async getById(id: string): Promise<Partial<Todo> | Error> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(Todo);
            return await dbRepository.findOne({
                where: { id },
                select: [
                    "id",
                    "title",
                    "description",
                    "status",
                    "disable",
                    "createdAt"
                ]
            })
        } catch (error) {
            return new Error(error);
        }
    }

    async insert(todo: Todo): Promise<void | Error> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(Todo);
            await dbRepository.save(todo);
        } catch (error) {
            return new Error(error);
        }
    }

    async update(id: string, obj: Todo): Promise<any | Error> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(Todo);
            const todo = await dbRepository.findOne({
                where: { id }
            })
            if(todo){
                await dbRepository.update(todo.id, obj);
            }
        } catch (error) {
            return new Error(error);
        }
    }

    async disable(id: string): Promise<any | Error> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(Todo);
            const todo = await dbRepository.findOne({
                where: { id }
            })
            console.log(todo);
            if(todo && todo !== null){
                return await dbRepository.update(todo.id, { disable: true, disabledAt: new Date() });
            }
            return new Error('Todo not found');
        } catch (error) {
            return new Error(error);
        }
    }

    async delete(id: string): Promise<void | Error> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(Todo);
            const todo = await dbRepository.findOne({
                where: { id }
            })
            if(todo){
                await dbRepository.delete(todo.id);
            }
        } catch (error) {
            return new Error(error);
        }
    }
}