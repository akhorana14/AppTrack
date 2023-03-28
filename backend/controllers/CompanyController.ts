import Company from "../models/Company";
import DBClient from "../utils/db/DBClient";

export default class UserController {
    static readonly userRepository = DBClient.getRepository(Company);

    static async getByName(name: string):Promise<Company | null> {
        return this.userRepository.findOne({
            where: {name: name}
        });
    }

    static save(...company: Company[]) {
        this.userRepository.save(company);
    }
}
