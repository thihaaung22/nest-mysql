import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "user_profiles" })
export class Profile {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    dob: string;

    @OneToOne(() => User, user => user.profile)
    user: User;
}