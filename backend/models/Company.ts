import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Company {
    @PrimaryColumn()
    name: string;
    @Column()
    leetcodeLink: string;
    @Column()
    levelsLink: string;
    @Column()
    color: string;

    constructor(name: string, leetcodeLink: string, levelsLink: string, color: string) {
        this.name = name;
        this.leetcodeLink = leetcodeLink;
        this.levelsLink = levelsLink;
        this.color = color;
    }
}
