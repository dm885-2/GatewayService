import jwt from "jsonwebtoken";
import mysql from "mysql";


const SECRET = process.env.SECRET ?? `3(?<,t2mZxj$5JT47naQFTXwqNWP#W>'*Kr!X!(_M3N.u8v}%N/JYGHC.Zwq.!v-`;  // JWT secret

const rapidUser = process.env.rapidUser ?? "guest";
const rapidPass = process.env.rapidPass ?? "guest";
export const host = "amqp://" + rapidUser + ":" + rapidPass + "@" + (process.env.riverUrl ?? `localhost`);  // RabbitMQ url

export const port = process.env.port ?? 8080;  // Express webserver port

/**
 * Returns the token payload if its valid, otherwise it returns false.
 * @param String token
 * @returns Promise<false|TokenData>
 */
export async function getTokenData(token)
{
    return new Promise(resolve => jwt.verify(token, SECRET, (err, data) => resolve(err ? false : data)));
}

let connection;
if(process.env.mysqlHost)
{
    connection = mysql.createConnection({
        host     : process.env.mysqlHost,
        user     : process.env.mysqlUser,
        password : process.env.mysqlPass,
        database : 'db'
    });
    connection.connect();
}

/**
 * Runs a SQL query on the DB.
 * @param string stmt
 * @param ?string[] WHERE
 * @returns results[]|false
 */
export async function query(stmt, WHERE = []) {
    return new Promise(r => connection.query(stmt, WHERE, (err, results) => r(err ? false : results)));
}
