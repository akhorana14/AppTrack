import Event from "../models/Event";
import DBClient from "../utils/db/DBClient";

export default class UserController {
    static readonly userRepository = DBClient.getRepository(Event);

    static async getById(id: number):Promise<Event | null> {
        return this.userRepository.findOne({
            where: {id: id}
        });
    }

    static save(...event: Event[]) {
        this.userRepository.save(event);
    }
}
