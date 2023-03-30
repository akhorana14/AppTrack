import Company from "../models/Company";
import DBClient from "../utils/db/DBClient";

export default class CompanyController {
    static readonly companyRepository = DBClient.getRepository(Company);

    static async getByName(name: string):Promise<Company | null> {
        return this.companyRepository.findOne({
            where: {name: name}
        });
    }

    static async create(companyName: string, leetcodeLink: string, levelsLink: string):Promise<void> {
        var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        var company = new Company(companyName, leetcodeLink, levelsLink, randomColor); 
        this.companyRepository.insert(company); 
    }
    
    static async getByNameAndCreateIfNotExist(name: string):Promise<Company | null> {
        if(!await this.companyRepository.exist({where: {name: name}})) {
            await this.save(new Company(name, "", "", "blue"));
        }
        return this.companyRepository.findOne({
            where: {name: name}
        });
    }

    static async save(...company: Company[]) {
        await this.companyRepository.save(company);
    }
}
