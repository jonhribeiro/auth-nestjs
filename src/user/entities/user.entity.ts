import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'varchar', length: 100})
  email: string;

  @Column({type: 'varchar', length: 100})
  password: string;

  @Column({type: 'varchar', length: 100})
  name: string;

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date

  // constructor() {
  //   if(!this.id) {
  //       this.id = uuid()
  //   }
  // }

}
