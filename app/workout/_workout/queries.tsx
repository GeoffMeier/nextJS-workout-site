import { useMutation, useQuery } from "@tanstack/react-query";
import { useAsyncData } from "../../_app/useAsyncData";
type Workout = {
	id: string;
	name: string;
	type: string;
	level: string;
	muscle: string;
};

type Log = {
	id: string;
	name: string;
	workoutName: string;
	sets: string;
	reps: string;
	weight: string;
};

import { Exercise, NewExerciseLog } from "./exercises";
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
export function useSavedExercises() {
	return useAsyncData<{ allWorkouts: Log[] }>({
		queryKey: ["pendingWorkouts", "all"],
		queryFn: async () => {
			const response = await fetch("/api/pendingWorkouts");
			return response.json();
		},
	});
}
// type NewPendingWorkout = Omit<PendingWorkout, "id">;
// export function usePendingWorkouts() {
// 	return useAsyncData<{ allPendingWorkouts: PendingWorkout[] }>({
// 		queryKey: ["pendingWorkouts", "all"],
// 		queryFn: async () => {
// 			const response = await fetch("/api/pendingWorkouts");
// 			return response.json();
// 		},
// 	});
// }

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
type NewLog = Omit<Log, "id">;
export function useAddExerciseLog() {
	return useMutation({
		mutationKey: ["pendingWorkouts", "add"],
		mutationFn: async (exerciseLog: NewLog) => {
			return await fetch("/api/pendingWorkouts", {
				method: "POST",
				body: JSON.stringify(exerciseLog),
				headers: {
					"content-type": "application/json",
				},
			});
		},
	});
}
export function useAddExerciseLogToPage() {
	return useMutation({
		mutationKey: ["pendingWorkouts", "save"],
		mutationFn: async (newLog: { exercise: ExerciseLog[] } & NewLog) => {
			return await fetch("/api/pendingWorkouts", {
				method: "POST",
				body: JSON.stringify(newLog),
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

// export function useAddPendingWorkoutToPage() {
// 	return useMutation({
// 		mutationKey: ["pendingWorkout", "save"],
// 		mutationFn: async (
// 			pendingWorkout: { exercise: Exercise[] } & NewPendingWorkout
// 		) => {
// 			return await fetch("/api/pendingWorkouts", {
// 				method: "POST",
// 				body: JSON.stringify(pendingWorkout),
// 				headers: {
// 					"content-type": "application/json",
// 				},
// 			});
// 		},
// 	});
// }
