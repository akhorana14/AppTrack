import Company from "../models/Company";
import DBClient from "../utils/db/DBClient";

export default class CompanyController {
    static readonly companyRepository = DBClient.getRepository(Company);

    static async getByName(name: string):Promise<Company | null> {
        return this.companyRepository.findOne({
            where: {name: name}
        });
    }
    
    static async getByNameAndCreateIfNotExist(name: string, leetcodeLink: string, levelsLink: string):Promise<Company | null> {
        if(!await this.companyRepository.exist({where: {name: name}})) {
            await this.save(new Company(name, leetcodeLink, levelsLink, "blue"));
        }
        return this.companyRepository.findOne({
            where: {name: name}
        });
    }

    static async save(...company: Company[]) {
        await this.companyRepository.save(company);
    }
}
