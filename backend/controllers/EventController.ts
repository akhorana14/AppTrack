import { EntityTarget, FindOptionsWhere, MoreThan, LessThan, Not } from "typeorm";
import Company from "../models/Company";
import Event from "../models/Event";
import User from "../models/User";
import DBClient from "../utils/db/DBClient";
import CompanyController from "./CompanyController";
import UserController from "./UserController";

export default class EventController {
    static readonly eventRepository = DBClient.getRepository(Event);

    static async getById(id: string): Promise<Event | null> {
        return this.eventRepository.findOne({
            where: { id: id }
        });
    }

    static async getEventsByUserAndCompany(user: User, company: Company) {
        return this.eventRepository.find({
            where: { company: company, user: this.getDBObject(user, User) as FindOptionsWhere<User> },
            //Sort ascending by date
            order: {
                date: "ASC"
            }
        });
    }

    // get new updates, defined as events assigned to a User where the event date is in the last 5 days
    static async getNewUpdatesByUser(user: User) {
        const dateRange = new Date();
        let today = new Date();
        dateRange.setDate(dateRange.getDate() - 3); // set to 3 days ago
        return this.eventRepository.find({
                relations: {
                    company: true
                },
            where: {user: this.getDBObject(user, User) as FindOptionsWhere<User>, 
                    date: MoreThan(dateRange),
                    isActionItem: true,
                    actionDate: Not(LessThan(today))
                },    
            order: {
                date: "DESC"
            }
            
        })
    }

    static async readByUser(user: User, company: string) {
        var offerEvent = await this.eventRepository.find({
            relations: {
                company: true,
                user: true
            },
            where: {
                company: {
                    name: company
                },
                user: this.getDBObject(user, User) as FindOptionsWhere<User>
            }
        });
        offerEvent[0].isRead = true;
        this.eventRepository.save(offerEvent[0]);
    }

    // get new updates, but order by Action Item date
    static async getNewUpdatesByUser2(user: User) {
        let dateRange = new Date();
        let today = new Date();
        dateRange.setDate(dateRange.getDate() - 3); // set to 3 days ago
        return this.eventRepository.find({
            where: {user: this.getDBObject(user, User) as FindOptionsWhere<User>, 
                    date: MoreThan(dateRange),
                    isActionItem: true,
                    actionDate: Not(LessThan(today))},
            order: {
                actionDate: "ASC"
            }
            
        })
    }

    static async removeCompany(user: User, company: string):Promise<void> {
        var eventsToRemove = await this.eventRepository.find({
            relations: {
                company: true,
                user: true
            },
            where: {
                company: {
                    name: company
                },
                user: this.getDBObject(user, User) as FindOptionsWhere<User>
            }
        });

        await this.eventRepository.remove(eventsToRemove);
    }

    static async getDailyEvents(user: User):Promise<Event[]> {
        return this.eventRepository.find({
            relations: {
                user: true,
                company: true
            },
            where: {
                user: this.getDBObject(user, User) as FindOptionsWhere<User>,
                isActionItem: true
            }
        });
    }

    static async getCompletedEvents(user: User):Promise<Event[]> {
        return this.eventRepository.find({
            relations: {
                user: true,
                company: true
            },
            where: {
                user: this.getDBObject(user, User) as FindOptionsWhere<User>,
                isActionItem: true,
                actionDate: LessThan(new Date()) 
            }
        });
    }

    static async getUpcomingEvents(user: User):Promise<Event[]> {
        return this.eventRepository.find({
            relations: {
                user: true,
                company: true
            },
            where: {
                user: this.getDBObject(user, User) as FindOptionsWhere<User>,
                isActionItem: true,
                actionDate: MoreThan(new Date())
            }
        });
    }

    static async addStatus(user: User, company: string, classification: number, classificationText: string, description: string, date: Date):Promise<void> {
        var companyObj = await CompanyController.getByName(company); 
        var userObj = await UserController.getById(user.id); 
        
        if (userObj != null && companyObj != null) {
            var status = new Event(userObj, new Date(), classificationText, description, companyObj, "", true, classification, false, date); 
            this.eventRepository.insert(status);
        }
    }

    static async save(...event: Event[]) {
        await this.eventRepository.save(event);
    }


    /**
    * This method returns an object that contains only fields that are stored in the database. This is primarily used
    * by the controllers in order to avoid querying for irrelevant fields that aren't stored in the database anyway (like User's displayName). 
    * 
    * @returns an object that only contains the fields that are stored in a database (so only fields that are marked with a typeorm annotation)
    */
    private static getDBObject(obj: any, target: EntityTarget<any>): any {
        let columns = DBClient.getMetadata(target).columns;
        let newObj: any = {};
        for (let property in obj) {
            //Check if this object property (field) has an associated column in the database
            if (columns.some(col => col.propertyName === property)) {
                //If it does, copy it over to our "pure" DB object
                newObj[property] = obj[property];
            }
        }
        return newObj;
    }
}