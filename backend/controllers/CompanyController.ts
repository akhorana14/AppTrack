import Company from "../models/Company";
import DBClient from "../utils/db/DBClient";
import User from "../models/User";
import { EntityTarget, FindOptionsWhere, MoreThan, LessThan, Not } from "typeorm";

export default class CompanyController {
    static readonly companyRepository = DBClient.getRepository(Company);

    static async getByNameAndUser(name: string, user: User):Promise<Company | null> {
        return this.companyRepository.findOne({
            where: {name: name, user: this.getDBObject(user, User)}
        });
    }
    
    static async getByNameAndCreateIfNotExist(name: string, user: User, leetcodeLink?: string, levelsLink?: string, position?: string):Promise<Company | null> {
        if(!await this.companyRepository.exist({where: {name: name, user: this.getDBObject(user, User)}})) {
            if(leetcodeLink === undefined) {
                leetcodeLink = `https://leetcode.com/discuss/interview-question?currentPage=1&orderBy=most_relevant&query=${name}`;
            }
            if(levelsLink === undefined) {
                levelsLink = `https://www.levels.fyi/companies/${name}/salaries`;
            }
            if (position == undefined) {
                position = "";
            }
            await this.save(new Company(name, user, leetcodeLink, levelsLink, "blue", true, position));
        }
        return this.getByNameAndUser(name, user);
    }

    static async untrackCompany(name: string, user: User):Promise<void> {
        var company = await this.getByNameAndUser(name, user);

        if (company !== null) {
            company.track = false; 
            this.save(company);
        }
    }

    static async save(...company: Company[]) {
        await this.companyRepository.save(company);
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
