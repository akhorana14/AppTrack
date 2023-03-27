import { NextFunction } from "express";

export default class GoogleAuth {
    /**
     * Returns Express middleware that verifies whether the user is logged in for a given route.
     * 
     * Example usage: 
     * router.get("/gauthtest", GoogleAuth.getAuthMiddleware, async function (req, res, next) {
     *      res.send("You're authenticated!");
     * });
     * 
     * @returns Express middleware
     */
    public static getAuthMiddleware() {
        return async function (req: any, res: any, next: NextFunction) {
            if (!req.user) {
                return res.redirect("/gauth");
            }
            next();
        }
    }
}
