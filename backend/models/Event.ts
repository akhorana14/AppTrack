import Company from "./Company";

export default class Event {
    date: string;
    subject: string;
    message: string;
    company: Company;
    emailLink: string;
    
    isActionItem: boolean;
    action: string;

    constructor(date: string, subject: string, message: string, company: Company, emailLink: string, 
        isActionItem: boolean, action: string) {
        this.date = date;
        this.subject = subject;
        this.message = message;
        this.company = company;
        this.emailLink = emailLink;
        this.isActionItem = isActionItem;
        this.action = action;
    }
}