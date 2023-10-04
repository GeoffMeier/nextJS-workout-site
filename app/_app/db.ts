import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function db() {
	const connectionString = process.env.SUPABASE_CONNECTION_STRING;
	const client = postgres(connectionString);
	const db = drizzle(client);

	return db;
}
