import { Column } from "typeorm";

export class BaseEntity {

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    disabledAt: Date;
}