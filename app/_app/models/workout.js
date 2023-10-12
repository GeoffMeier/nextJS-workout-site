import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const workouts = pgTable("workouts", {
	id: serial("id").primaryKey(),
	name: text("name"),
	type: text("type"),
	level: text("level"),
	muscle: text("muscle"),
});

export const LogExercises = pgTable("ExerciseLog", {
	id: serial("id").primaryKey(),
	name: text("name"),
	workoutName: text("workoutName"),
	sets: text("sets"),
	reps: text("reps"),
	weight: text("weight"),
});
