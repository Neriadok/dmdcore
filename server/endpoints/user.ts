import {CrudEndpoints} from "../interfaces/crud-endpoints";
import {getEntity, setEntity} from "../lib/entity-management";
import {AppUser} from "../../client/src/entities/app-user";
import DbUser from "../entities/db-user";

const methods: CrudEndpoints<AppUser> = {create, read}
export default methods;

async function create(req, res) {
    const body = req.body;
    const entity = await setEntity<AppUser>(body, DbUser, {where: {uid: body.uid}, rejectOnEmpty: false})
    res.status(entity ? 200 : 204).send(entity);
}

async function read(req, res) {
    const entity = await getEntity<AppUser>(DbUser, {where: {uid: req.query?.uid}, rejectOnEmpty: false})
    res.status(entity ? 200 : 204).send(entity);
}