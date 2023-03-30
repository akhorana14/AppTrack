import Company from "../models/Company";
import DBClient from "../utils/db/DBClient";

export default class CompanyController {
    static readonly userRepository = DBClient.getRepository(Company);

    static async getByName(name: string):Promise<Company | null> {
        return this.userRepository.findOne({
            where: {name: name}
        });
    }

    static async create(companyName: string, leetcodeLink: string, levelsLink: string):Promise<void> {
        var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        var company = new Company(companyName, leetcodeLink, levelsLink, randomColor); 
        this.userRepository.insert(company); 
    }
    
    static save(...company: Company[]) {
        this.userRepository.save(company);
    }
}
