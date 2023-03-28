import Company from "../models/Company";
import DBClient from "../utils/db/DBClient";

export default class CompanyController {
    static readonly companyRepository = DBClient.getRepository(Company);

    static async getByName(name: string):Promise<Company | null> {
        return this.companyRepository.findOne({
            where: {name: name}
        });
    }

    static save(...company: Company[]) {
        this.companyRepository.save(company);
    }
}
