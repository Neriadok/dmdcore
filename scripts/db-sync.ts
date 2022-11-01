import {sql} from "../server/lib/database";
import {sync} from "glob";
import {resolve} from "path";

sql(syncModels);

async function syncModels() {
    const route = resolve(__dirname, '../server/entities/*.ts').replace(/\\/gi,'/')
    const models = sync(route);
    console.log(route, models);
    await Promise.all(models.map(syncModel));
}

async function syncModel(path: string) {
    console.log('Syncing ', path);
    const model = require(path).default;
    await model.sync({ alter: true });
}