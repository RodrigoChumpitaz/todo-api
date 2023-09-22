import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../core/infraestructure/base-entity';
import { ITodoInsert } from 'src/core/interfaces/todo.interface';

@Entity('todo')
export class Todo extends BaseEntity{
    constructor(properties: ITodoInsert){
        super();
        Object.assign(this, properties);
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', nullable: false, length: 75 })
    title: string;

    @Column({ type: 'nvarchar', nullable: false, length: 150 })
    description: string;

    @Column({ type: 'varchar', nullable: false, length: 75, default: 'pending' })
    status: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    disable: boolean;
    // @Column({ type: 'varchar', nullable: false })
    // userId: string;     
}