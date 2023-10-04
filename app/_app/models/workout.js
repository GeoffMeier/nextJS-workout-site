import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const workouts = pgTable("workouts", {
	id: serial("id").primaryKey(),
	name: text("name"),
	type: text("type"),
	level: text("level"),
	muscle: text("muscle"),
});
