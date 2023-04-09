import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from "./User";

@Entity()
export default class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    leetcodeLink: string;
    @Column()
    levelsLink: string;
    @Column()
    color: string;
    @ManyToOne(type => User) @JoinColumn()
    user: User;
    @Column()
    track: boolean;
    @Column()
    position: string;

    constructor(name: string, user: User, leetcodeLink: string, levelsLink: string, color: string, track: boolean, position: string) {
        this.name = name;
        this.leetcodeLink = leetcodeLink;
        this.levelsLink = levelsLink;
        this.color = color;
        this.user = user;
        this.track = track;
        this.position = position;
    }
}
