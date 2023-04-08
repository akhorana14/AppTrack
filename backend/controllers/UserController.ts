import User from "../models/User";
import DBClient from "../utils/db/DBClient";
import { EntityTarget, FindOptionsWhere } from "typeorm";

export default class UserController {
    static readonly userRepository = DBClient.getRepository(User);

    static async getById(id: string):Promise<User | null> {
        return this.userRepository.findOne({
            where: {id: id}
        });
    }

    static async deactivate(user: User, message: string) {
        user.accountDeactivated = true;
        user.accountDeactivatedMessage = message;
        await this.userRepository.save(user);
    }

    static async activate(user: User) {
        user.accountDeactivated = false;
        user.accountDeactivatedMessage = "";
        await this.userRepository.save(user);
    }

    static async removeUser(...user: User[]) {
        await this.userRepository.remove(user);
    }

    static async save(...user: User[]) {
        await this.userRepository.save(user);
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
