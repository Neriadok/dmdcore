import express, {Express} from "express";
import path from "path";
import http from "http";
import {AddressInfo} from "net";
import {sync} from "glob";
import {CrudEndpoints} from "./interfaces/crud-endpoints";

export const app = runExpressApp();
export default app;

function runExpressApp(): Express {
    const app = express();
    serveStaticFiles(app);
    serveApp(app);
    serveApi(app);
    choosePort(app, parseInt(process.env.PORT) || 80);
    return app;
}

function serveApp(app: Express) {
    app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/build/index.html')));
}

function serveApi(app: Express) {
    app.use(express.json());
    const routePath = path.resolve(__dirname, 'endpoints').replace(/\\/gi, '/');
    const endpoints = sync(path.resolve(routePath, '**/*.ts'));
    endpoints.forEach((endpoint) => useEndpoint(app, routePath, endpoint));
}

function useEndpoint(app: Express, routePath: string, endpoint: string) {
    const route = '/api' + endpoint.replace(routePath, '').replace(/\.ts$/, '');
    const {create, read, update, remove}: CrudEndpoints<any> = require(endpoint)?.default || {};
    if (create) {
        app.post(route, create);
        console.log(`POST -> ${route} `);
    }
    if (read) {
        app.get(route, read);
        console.log(`GET -> ${route}`);
    }
    if (update) {
        app.patch(route, update);
        console.log(`PATCH -> ${route}`);
    }
    if (remove) {
        app.delete(route, remove);
        console.log(`DELETE -> ${route}`);
    }
}

function serveStaticFiles(app: Express) {
    app.use(express.static(path.join(__dirname, '../client/build')));

}

function choosePort(app: Express, PORT: string | number) {
    if (PORT) {
        app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
    } else {
        let server = http.createServer(app);
        server.listen(0, () => logServerPort(server.address()));
    }

}

function logServerPort(address: AddressInfo | string | number | null) {
    if (typeof address === "string" || typeof address === "number") {
        console.log(`Server listening on "${address}"`)
    } else {
        console.log(`Server listening on "${address?.port}"`)
    }
}