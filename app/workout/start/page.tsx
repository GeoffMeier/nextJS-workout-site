"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	useAddWorkout,
	useAddWorkoutToPage,
	useWorkouts,
} from "../_workout/queries";
import { useSearchParams } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import {
	DifficultyLevel,
	Exercise,
	NewExercise,
	TypeOfExercise,
	TypeOfMuscle,
} from "../_workout/exercises";
import { DialogDemo } from "@/app/components/DialogDemo";

export default function startWorkout() {
	const [isStarted, setStarted] = useState(false);
	const searchParams = useSearchParams();
	const [getWorkoutName, setWorkoutName] = useState("");
	const [getWorkoutId, setWorkoutId] = useState("");

	const [newWorkout, setWorkout] = useState<NewExercise>();
	const [getExercises, setExercises] = useState<Exercise[]>([]);

	const id = searchParams.get("id");

	console.log(id);
	const generateExercises = useAddWorkout();
	const workouts = useWorkouts();
	const addToPage = useAddWorkoutToPage();

	const handleBeginWorkout = async (e) => {
		e.preventDefault();

		// Check if newWorkout is not already set
		if (!newWorkout) {
			workouts.data.allWorkouts.forEach(async (workout) => {
				if (workout.id === id) {
					console.log("hitt");
					setWorkout({
						name: workout.name,
						type: workout.type as TypeOfExercise,
						muscle: workout.muscle as TypeOfMuscle,
						difficulty: workout.level as DifficultyLevel,
					});
					setWorkoutName(workout.name);
					setWorkoutId(workout.id);
					// Use try-catch to handle errors
					try {
						const res = await generateExercises.mutateAsync({
							// Pass the correct payload here
							name: workout.name,
							type: workout.type as TypeOfExercise,
							muscle: workout.muscle as TypeOfMuscle,
							level: workout.level as DifficultyLevel,
						});

						// Handle form submission with the selected options
						console.log(res);

						// React Query mutations typically return the updated data
						// Set the exercises from the result
						setExercises(await res.json());

						setStarted(true);
					} catch (error) {
						console.error("Error fetching exercises:", error);
					}
				}
			});
		}
	};

	if (workouts.loading) {
		return <div>loading...</div>;
	}
	if (workouts.error) {
		return <div>error retrieving workouts</div>;
	}

	return (
		<>
			{!isStarted &&
				workouts.data.allWorkouts.map((workout) => {
					if (workout.id === id) {
						return (
							<div className="md:w-screen md:h-screen p-10 bg-gradient-to-b from-zinc-950 to-gray-700">
								<div className="flex justify-center">
									<Card className="md:w-[400px]   border bg-zinc-800 rounded-lg ">
										<CardHeader>
											<CardTitle className="text-indigo-500 font-bold">
												Start Your Workout
											</CardTitle>
											<CardDescription className="text-zinc-300 font-medium">
												Click start to begin!
											</CardDescription>
										</CardHeader>
										<CardContent>
											<form onSubmit={handleBeginWorkout} id={workout.id}>
												<div className="grid w-full items-center gap-4 ">
													<div className="flex flex-col space-y-1.5 ">
														<Label
															className="font-semibold text-indigo-500"
															htmlFor="name"
														>
															Name
														</Label>
														<Input
															className="bg-zinc-800 text-white"
															id="name"
															value={workout.name}
															readOnly
														/>
													</div>

													<div className="flex flex-col space-y-1.5 ">
														<Label
															className="font-semibold text-indigo-500"
															htmlFor="type"
														>
															Exercise Type
														</Label>
														<Input
															className="bg-zinc-800 text-white"
															id="type"
															value={workout.type}
															readOnly
														/>
													</div>
													<div className="flex flex-col space-y-1.5 ">
														<Label
															className="font-semibold text-indigo-500"
															htmlFor="level"
														>
															Level
														</Label>
														<Input
															className="bg-zinc-800 text-white"
															id="level"
															value={workout.level}
															readOnly
														/>
													</div>
													<div className="flex flex-col space-y-1.5 ">
														<Label
															className="font-semibold text-indigo-500"
															htmlFor="muscle"
														>
															Muscle
														</Label>
														<Input
															className="bg-zinc-800 text-white"
															id="muscle"
															value={workout.muscle}
															readOnly
														/>
													</div>
													<div className="flex space-x-10  justify-center mt-4">
														<Button
															className="font-extrabold hover:text-green-800 hover:bg-zinc-900 text-lg bg-zinc-800 text-green-700"
															variant="ghost"
															type="submit"
														>
															Begin Workout
														</Button>
													</div>
												</div>
											</form>
										</CardContent>
									</Card>
								</div>
							</div>
						);
					}
					return null;
				})}

			{isStarted && (
				<div className=" flex justify-center  bg-gradient-to-b from-zinc-950 pb-12 to-gray-700">
					<div className="p-10 md:w-screen md:h-screen">
						<h2 className="text-indigo-500 text-center pb-10 font-semibold uppercase">
							Ready to Start Workouts
						</h2>
						<div className="  border bg-zinc-800 md:rounded-lg py-4">
							<Table>
								<TableCaption>
									Enjoy Your Workout! Track your workout data using the workout
									details choice
								</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead className="text-indigo-500 font-sans font-bold">
											Workout Details
										</TableHead>
										<TableHead className="text-indigo-500 font-sans font-bold">
											Exercise Name
										</TableHead>
										<TableHead className="text-indigo-500 font-sans font-bold">
											Muscle
										</TableHead>
										<TableHead className="text-indigo-500 font-sans font-bold">
											Type
										</TableHead>
										<TableHead className="text-indigo-500 font-sans font-bold">
											Level
										</TableHead>
									</TableRow>
								</TableHeader>
								{getExercises.map((exercise) => {
									return (
										<TableBody>
											<TableRow>
												<TableCell>
													<DialogDemo
														name={exercise.name}
														workoutID={getWorkoutId}
														workoutName={getWorkoutName}
														description={exercise.instructions}
													></DialogDemo>
												</TableCell>
												<TableCell className="font-sm text-zinc-300">
													{exercise.name}
												</TableCell>
												<TableCell className="font-sm text-zinc-300">
													{exercise.muscle}
												</TableCell>
												<TableCell className="font-sm text-zinc-300">
													{exercise.type}
												</TableCell>
												<TableCell className="font-sm text-zinc-300">
													{exercise.difficulty}
												</TableCell>
											</TableRow>
										</TableBody>
									);
								})}
							</Table>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
