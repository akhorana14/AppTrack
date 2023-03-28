import Company from "./Company";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Classification } from "./Classification";
import User from "./User";

@Entity()
export default class Event {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(type => User) @JoinColumn()
    user: User;
    @Column()
    date: Date;
    @Column({ length: 1000 })
    subject: string;
    @Column({ type:"varchar", length:"MAX" })
    body: string;
    @ManyToOne(type => Company) @JoinColumn()
    company: Company;
    @Column({ length: 500 })
    emailLink: string;
    @Column()
    isActionItem: boolean;
    @Column()
    classification: Classification;
    @Column({ nullable: true })
    isRead?: boolean;
    @Column({ nullable: true })
    actionDate?: Date;

    constructor(user: User, date: Date, subject: string, body: string, company: Company, emailLink: string,
        isActionItem: boolean, classification: Classification, isRead?: boolean, actionDate?: Date) {
        this.user = user;
        this.date = date;
        this.subject = subject;
        this.body = body;
        this.company = company;
        this.emailLink = emailLink;
        this.isActionItem = isActionItem;
        this.classification = classification;
        this.isRead = isRead;
        this.actionDate = actionDate;
    }


}
