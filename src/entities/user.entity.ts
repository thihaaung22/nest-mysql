import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    username: string

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    authStrategy: string;

    @OneToOne(() => Profile, (profile) => profile.user)
    @JoinColumn()
    profile: Profile
}