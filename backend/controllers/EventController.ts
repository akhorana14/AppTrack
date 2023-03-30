import { EntityTarget, FindOptionsWhere } from "typeorm";
import Company from "../models/Company";
import Event from "../models/Event";
import User from "../models/User";
import DBClient from "../utils/db/DBClient";

export default class EventController {
    static readonly eventRepository = DBClient.getRepository(Event);

    static async getById(id: number): Promise<Event | null> {
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
