import User from "../models/User";
import DBClient from "../utils/db/DBClient";

export default class UserController {
    static readonly userRepository = DBClient.getRepository(User);

    static async getById(id: string):Promise<User | null> {
        return this.userRepository.findOne({
            where: {id: id}
        });
    }

    static async save(...user: User[]) {
        await this.userRepository.save(user);
    }
}
