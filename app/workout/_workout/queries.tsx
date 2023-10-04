import { useMutation, useQuery } from "@tanstack/react-query";
import { useAsyncData } from "../../_app/useAsyncData";
type Workout = {
	id: string;
	name: string;
	type: string;
	level: string;
	muscle: string;
};

import { Exercise } from "./exercises";
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
