import{Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'users'})
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    last_name: string;

    @Column({type: 'integer'})
    age: number;

    @Column({type: 'varchar'})
    gender: string;

    @Column({type: 'boolean'})
    problem: boolean;
}