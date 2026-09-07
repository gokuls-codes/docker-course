import fs from "fs"
import { Pool } from "pg"

const databaseUrl = process.env.DATABASE_URL || fs.readFileSync(process.env.DATABASE_URL_FILE, 'utf-8')

const pool = new Pool({
    connectionString: databaseUrl
});

pool.on('error', (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1)
})

export const getDateTime = async () => {
    const client = await pool.connect()
    try {
        const res = await client.query("SELECT NOW() as now;");
        return res.rows[0]
    } catch(err) {
        console.log(err.stack)
    } finally {
        client.release()
    }
}