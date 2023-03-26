import { DataSource } from "typeorm"
import User from "../../models/User";

const datasource = new DataSource({
    "type": "mssql",
    "host": "apptrack.database.windows.net",
    "port": 1433,
    "username": "apptrack",
    //Make sure you have added the database into your .env file
    "password": process.env.APPTRACK_DB_PASSWORD,
    "database": "AppTrackDB",
    "synchronize": true,
    "logging": false,
    //Add your entities here
    "entities": [User]
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
