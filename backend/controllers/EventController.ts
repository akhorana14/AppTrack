import { LessThan, MoreThan } from "typeorm";
import Event from "../models/Event";
import DBClient from "../utils/db/DBClient";
import CompanyController from "./CompanyController";
import UserController from "./UserController";

export default class EventController {
    static readonly userRepository = DBClient.getRepository(Event);

    static async getById(id: number):Promise<Event | null> {
        return this.userRepository.findOne({
            where: {id: id}
        });
    }

    static async removeCompany(user: string, company: string):Promise<void> {
        var eventsToRemove = await this.userRepository.find({
            relations: {
                company: true,
                user: true
            },
            where: {
                company: {
                    name: company
                },
                user: {
                    id: user
                }
            }
        });

        await this.userRepository.remove(eventsToRemove);
    }

    static async getDailyEvents(user: string):Promise<Event[]> {
        return this.userRepository.find({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: user
                },
                isActionItem: true
            }
        });
    }

    static async getCompletedEvents(user: string):Promise<Event[]> {
        return this.userRepository.find({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: user
                },
                isActionItem: true,
                actionDate: LessThan(new Date()) 
            }
        });
    }

    static async getUpcomingEvents(user: string):Promise<Event[]> {
        return this.userRepository.find({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: user
                },
                isActionItem: true,
                actionDate: MoreThan(new Date())
            }
        });
    }

    static async addStatus(user: string, company: string, classification: number):Promise<void> {
        var companyObj = await CompanyController.getByName(company); 
        var userObj = await UserController.getById(user); 
        var date = new Date(); 
        
        if (userObj != null && companyObj != null) {
            var status = new Event(userObj, date, "", "", companyObj, "", true, classification, false, date); 
            this.userRepository.insert(status);
        }
    }

    static save(...event: Event[]) {
        this.userRepository.save(event);
    }
}
