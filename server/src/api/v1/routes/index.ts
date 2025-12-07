import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const apiV1Router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const modulesPath = path.join(__dirname, "../modules");
const require = createRequire(import.meta.url);

// Automatically require all `routes.ts` in modules
fs.readdirSync(modulesPath).forEach((moduleFolder) => {
    const routeFile = path.join(modulesPath, moduleFolder, "routes.ts");
    try {
        const moduleRouter = require(routeFile).default;
        apiV1Router.use(`/${moduleFolder}`, moduleRouter);
    } catch (err) {
        console.warn(`No routes found for module: ${moduleFolder}`);
    }
});

export default apiV1Router;
