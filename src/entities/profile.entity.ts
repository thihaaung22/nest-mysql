import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    user_id: number;

    @OneToOne(() => User, user => user.profile)
    @JoinColumn({ name: "user_id" })
    user: User;
}