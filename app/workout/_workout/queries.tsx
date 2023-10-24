import { useMutation, useQuery } from "@tanstack/react-query";
import { useAsyncData } from "../../_app/useAsyncData";
type Workout = {
	id: string;
	name: string;
	type: string;
	level: string;
	muscle: string;
};

type WorkoutHistory = {
	id: string;
	workoutName: string;
	workoutId: string;
	exercises: {
		name: string;
		sets: string;
		reps: string;
		weight: string;
	};
};

import { Exercise, History } from "./exercises";
import { ExerciseLog } from "./exercises";
type NewWorkout = Omit<Workout, "id">;
export function useWorkouts() {
	return useAsyncData<{ allWorkouts: Workout[] }>({
		queryKey: ["workouts", "all"],
		queryFn: async () => {
			const response = await fetch("/api/workouts");
			return response.json();
		},
	});
}

type NewWorkoutHistory = Omit<WorkoutHistory, "id">;
export function useAddWorkout() {
	return useMutation({
		mutationKey: ["workouts", "add"],
		mutationFn: async (newWorkout: NewWorkout) => {
			return await fetch("/api/exercises", {
				method: "POST",
				body: JSON.stringify(newWorkout),
				headers: {
					"content-type": "application/json",
				},
			});
		},
	});
}
export function useAddHistory() {
	return useMutation({
		mutationKey: ["workoutHistory", "add"],
		mutationFn: async (history: NewWorkoutHistory) => {
			return await fetch("/api/workoutHistory", {
				method: "POST",
				body: JSON.stringify(history),
				headers: {
					"content-type": "application/json",
				},
			});
		},
	});
}
export function useAddWorkoutHistoryToPage() {
	return useMutation({
		mutationKey: ["workouts", "save"],
		mutationFn: async (
			newWorkoutHistory: { exercise: History[] } & NewWorkout
		) => {
			return await fetch("/api/workouts", {
				method: "POST",
				body: JSON.stringify(newWorkoutHistory),
				headers: {
					"content-type": "application/json",
				},
			});
		},
	});
}
export function useAddWorkoutToPage() {
	return useMutation({
		mutationKey: ["workouts", "save"],
		mutationFn: async (newWorkout: { exercise: Exercise[] } & NewWorkout) => {
			return await fetch("/api/workouts", {
				method: "POST",
				body: JSON.stringify(newWorkout),
				headers: {
					"content-type": "application/json",
				},
			});
		},
	});
}
