import express from "express";
import Log from "@/utils/logger.js";
import createDbConnection from "@/config/database.js";
import apiV1Router from "@/api/v1/routes/index.js";
import i18n from "@/config/i18n.js";
import cookieParser from "cookie-parser";

const server = express();
const PORT = parseInt(process.env.APP_PORT || '3000', 10);
const HOST = process.env.APP_HOST! || 'localhost';

server.use(express.json());
server.use(cookieParser());
server.use(i18n);

// z.locales.ar();

server.use("/api/v1", apiV1Router);

createDbConnection()
.then(() => {
    server.listen(PORT, HOST, (error) => {
        if (error) {
            Log.error("Server failed to start: ", error);
            process.exit(1);
        }
        console.log(`Server is running at http://${HOST}:${PORT}`);
    })
})
.catch((err) => {
    Log.error("Failed to connect to the database: ", err);
    process.exit(1);
});