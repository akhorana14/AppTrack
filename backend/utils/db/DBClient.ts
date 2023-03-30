import { DataSource } from "typeorm"
import User from "../../models/User";
import Event from "../../models/Event";
import Company from "../../models/Company";

const datasource = new DataSource({
    "type": "mssql",
    "host": "apptrack.database.windows.net",
    "port": 1433,
    "username": "apptrack",
    //Make sure you have added the database into your .env file
    "password": "MwiCAm57^n1n",
    "database": "AppTrackDB",
    "synchronize": true,
    "logging": false,
    //Add your entities here
    "entities": [User, Company, Event]
}
);

datasource.initialize()
    .then(() => {
        console.log("Connection to database successful!")
    })
    .catch((err) => {
        console.error("Error during database connection", err)
    });


export default datasource;
