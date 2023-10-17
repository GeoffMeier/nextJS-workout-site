"use client";
import { Button } from "@/components/ui/button";
import {
	useAddWorkout,
	useAddWorkoutHistory,
	useSavedExercises,
	useWorkoutHistory,
	useWorkouts,
} from "./_workout/queries";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useState } from "react";
import {
	DifficultyLevel,
	Exercise,
	History,
	NewExercise,
	PendingWorkout,
	TypeOfExercise,
	TypeOfMuscle,
	typeOfExercise,
} from "./_workout/exercises";
import { DialogDemo } from "../components/DialogDemo";
import { Input } from "@/components/ui/input";

export default function workouts() {
	const [startWorkout, setStartWorkout] = useState<Exercise[]>([]);
	const [work, setWork] = useState<NewExercise>();
	const [getWorkoutName, setWorkoutName] = useState("");
	const [workoutId, setWorkoutId] = useState("");
	const [workoutLevel, setWorkoutLevel] = useState("");
	const [workoutMuscle, setWorkoutMuscle] = useState("");
	const [workoutType, setWorkoutType] = useState("");

	const generateExercises = useAddWorkout();
	const workouts = useWorkouts();
	const SavedExercises = useSavedExercises();
	const historyMutation = useAddWorkoutHistory();
	const WorkoutHistory = useWorkoutHistory();
	const [history, setHistory] = useState<History>();

	// const handleClick = (e) => {
	// 	console.log(e.target.id);

	// 	workouts.data.allWorkouts.forEach(async (workout) => {
	// 		if (workout.name === e.target.id) {
	// 			setWorkoutId(workout.id);
	// 			setWorkoutName(workout.name);
	// 			setWorkoutLevel(workout.level);
	// 			setWorkoutMuscle(workout.muscle);
	// 			console.log(workoutMuscle);
	// 			console.log(getWorkoutName);
	// 			setWorkoutType(workout.type);
	// 			if (workoutMuscle === workout.muscle) {
	// 				setWork({
	// 					...work,
	// 					name: getWorkoutName,
	// 				});

	// 				setWork({
	// 					...work,
	// 					difficulty: workoutLevel as DifficultyLevel,
	// 				});
	// 				setWork({
	// 					...work,
	// 					type: workoutType as TypeOfExercise,
	// 				});
	// 				setWork({
	// 					...work,
	// 					muscle: workoutMuscle as TypeOfMuscle,
	// 				});
	// 				const { difficulty, ...rest } = work;

	// 				const res = await generateExercises.mutateAsync({
	// 					...rest,
	// 					level: difficulty,
	// 				});

	// 				setStartWorkout(await res.json());

	// 				console.log(work);
	// 			}
	// 		}
	// 	});
	// };

	// const handleSubmit = () => {
	// 	SavedExercises.data.allWorkouts.forEach(async (exercise) => {
	// 		if (exercise.workoutName === getWorkoutName) {
	// 			console.log("hit!!");
	// 			try {
	// 				const res = await historyMutation.mutateAsync({
	// 					workoutName: exercise.workoutName,
	// 					exercises: [
	// 						{
	// 							name: exercise.name,
	// 							sets: exercise.sets,
	// 							reps: exercise.reps,
	// 							weight: exercise.weight,
	// 						},
	// 					],
	// 				});
	// 				const savedHistory = await res.json();
	// 				setHistory(savedHistory);
	// 				console.log(savedHistory);
	// 			} catch (error) {
	// 				console.error("Error saving exercise log:", error);
	// 			}
	// 		}
	// 	});
	// };

	const handleClick = () => {};
	if (workouts.loading) {
		return <div>loading...</div>;
	}
	if (workouts.error) {
		return <div>error retrieving workouts</div>;
	}

	return (
		<div className=" flex justify-center  bg-gradient-to-b from-zinc-950 pb-12 to-gray-700">
			<div className="p-10 md:w-screen md:h-screen">
				<>
					<h2 className="text-indigo-500 text-center pb-10 font-semibold uppercase">
						Ready to Start Workouts
					</h2>
					<div className="  border bg-zinc-800 md:rounded-lg py-4">
						<Table id="workouts" className="">
							<TableCaption className="text-indigo-500 font-sans font-semibold pt-4">
								Here's a list of workouts you have saved
							</TableCaption>
							<TableHeader className="">
								<TableRow className="">
									<TableHead className="text-indigo-500 font-sans font-bold">
										Name
									</TableHead>
									<TableHead className="text-indigo-500 font-sans font-bold">
										Muscle
									</TableHead>
									<TableHead className="text-indigo-500 font-sans font-bold">
										Type
									</TableHead>
									<TableHead className="text-indigo-500 font-sans font-bold">
										Difficulty
									</TableHead>
									<TableHead className="text-indigo-500 font-sans font-bold"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{workouts.data.allWorkouts.map((workout) => (
									<>
										<TableRow>
											<TableCell className="font-sm text-zinc-300">
												{workout.name}
											</TableCell>

											<TableCell className="font-sm text-zinc-300">
												{workout.muscle}
											</TableCell>
											<TableCell className="font-sm text-zinc-300">
												{workout.type}
											</TableCell>
											<TableCell className="font-sm text-zinc-300">
												{workout.level}
											</TableCell>

											<TableCell className="font-sm text-zinc-300">
												<Link href={`/workout/start?id=${workout.id}`}>
													Start Workout
												</Link>
											</TableCell>
										</TableRow>
									</>
								))}
							</TableBody>
						</Table>
					</div>
				</>
			</div>
		</div>
	);
}
