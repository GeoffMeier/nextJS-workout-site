import { json } from "drizzle-orm/mysql-core";
import { jsonb, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const workouts = pgTable("workouts", {
	id: serial("id").primaryKey(),
	name: text("name"),
	type: text("type"),
	level: text("level"),
	muscle: text("muscle"),
});
export const workoutHistory = pgTable("WorkoutHistory", {
	id: serial("id").primaryKey(),
	workoutId: text("workoutId").references(workouts.id).notNull(),
	workoutName: text("workoutName").references(workouts.name).notNull(),
	exercises: jsonb("exercises"),
});

export const LogExercises = pgTable("ExerciseLog", {
	id: serial("id").primaryKey(),
	name: text("name"),
	workoutName: text("workoutName"),
	sets: text("sets"),
	reps: text("reps"),
	weight: text("weight"),
});
