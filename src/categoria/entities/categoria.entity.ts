import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 100})
    name: string

    @Column({type: 'varchar', nullable: true ,length: 200})
    description: string

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date
} 
