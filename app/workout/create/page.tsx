"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"; // Update with your import paths
import {
	useAddWorkout,
	useAddWorkoutToPage,
	useWorkouts,
} from "../_workout/queries";
import { SelectGroup } from "@radix-ui/react-select";
import {
	DifficultyLevel,
	Exercise,
	NewExercise,
	TypeOfExercise,
	TypeOfMuscle,
	difficultyLevel,
	typeOfExercise,
	typeOfMuscle,
} from "../_workout/exercises";
import Link from "next/link";
import { workouts } from "@/app/_app/models/workout";
const CreateWorkout = () => {
	const addWorkoutMutation = useAddWorkout();
	const initialWorkoutState: NewExercise = {
		type: typeOfExercise.strength,
		name: "",
		difficulty: difficultyLevel.beginner,
		muscle: typeOfMuscle.abdominals,
	};
	const addWorkoutToPageMutation = useAddWorkoutToPage();

	const [workout, setWorkout] = useState<NewExercise>(initialWorkoutState);
	const [pendingWorkout, setPendingWorkout] = useState<Exercise[]>([]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { difficulty, ...rest } = workout;
		const res = await addWorkoutMutation.mutateAsync({
			...rest,
			level: difficulty,
		});
		// Handle form submission with the selected options

		setPendingWorkout(await res.json());
	};
	const handleSubmitWorkout = async (e) => {
		console.log("hit2");
		const { difficulty, ...rest } = workout;
		const res = await addWorkoutToPageMutation.mutateAsync({
			...rest,
			level: difficulty,
			exercise: pendingWorkout,
		});
		// Handle form submission with the selected options

		const body = await res.json();
	};
	const handleReset = (e) => {
		e.preventDefault();
		setWorkout(initialWorkoutState);
	};

	return (
		<>
			<div className=" md:w-screen md:h-screen p-10 bg-gradient-to-b from-zinc-950 to-gray-700">
				<div className="items-center md:grid   md:grid-cols-3 p-4  gap-4 ">
					<div className="md:col-span-1">
						<Card className="md:w-[400px]   border bg-zinc-800 rounded-lg ">
							<CardHeader>
								<CardTitle className="text-indigo-500 font-bold">
									Create Workout
								</CardTitle>
								<CardDescription className="text-zinc-300 font-medium">
									Create a workout and track your progress
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} onReset={handleReset}>
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
												placeholder="Name of your workout"
												value={workout.name}
												onChange={(e) =>
													setWorkout({
														...workout,
														name: e.target.value,
													})
												}
											/>
										</div>

										<div className="flex flex-col space-y-1.5">
											<Label
												className="font-semibold text-indigo-500"
												htmlFor="type"
											>
												Exercise Type
											</Label>

											<Select
												onValueChange={(value) =>
													setWorkout({
														...workout,
														type: value as TypeOfExercise,
													})
												}
												value={workout.type}
											>
												<SelectTrigger className="bg-zinc-800 text-white">
													<SelectValue placeholder="Select a type" />
												</SelectTrigger>
												<SelectContent position="popper">
													<SelectGroup>
														{Object.entries(typeOfExercise).map(
															([key, value]) => (
																<SelectItem value={value} key={key}>
																	{value}
																</SelectItem>
															)
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label
												className="font-semibold text-indigo-500"
												htmlFor="level"
											>
												Level
											</Label>
											<Select
												onValueChange={(value) =>
													setWorkout({
														...workout,
														difficulty: value as DifficultyLevel,
													})
												}
												value={workout.difficulty}
											>
												<SelectTrigger className="bg-zinc-800 text-white">
													<SelectValue placeholder="Select" />
												</SelectTrigger>
												<SelectContent position="popper">
													<SelectItem value="beginner">Beginner</SelectItem>
													<SelectItem value="intermediate">
														Intermediate
													</SelectItem>
													<SelectItem value="expert">Expert</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="flex flex-col space-y-1.5">
											<Label
												className="font-semibold text-indigo-500"
												htmlFor="muscle"
											>
												Muscle
											</Label>
											<Select
												onValueChange={(value) =>
													setWorkout({
														...workout,
														muscle: value as TypeOfMuscle,
													})
												}
												value={workout.muscle}
											>
												<SelectTrigger className="bg-zinc-800 text-white">
													<SelectValue placeholder="Select" />
												</SelectTrigger>
												<SelectContent position="popper">
													<SelectItem value="abdominals">abdominals</SelectItem>
													<SelectItem value="abductors">abductors</SelectItem>
													<SelectItem value="adductors">adductors</SelectItem>
													<SelectItem value="biceps">biceps</SelectItem>
													<SelectItem value="calves">calves</SelectItem>
													<SelectItem value="chest">chest</SelectItem>
													<SelectItem value="forearms">forearms</SelectItem>
													<SelectItem value="glutes">glutes</SelectItem>
													<SelectItem value="hamstrings">hamstrings</SelectItem>
													<SelectItem value="lower_back">lower back</SelectItem>
													<SelectItem value="middle_back">
														middle back
													</SelectItem>
													<SelectItem value="neck">neck</SelectItem>
													<SelectItem value="quadriceps">quadriceps</SelectItem>
													<SelectItem value="traps">traps</SelectItem>
													<SelectItem value="triceps">triceps</SelectItem>
													{/* Add other muscle options here */}
												</SelectContent>
											</Select>
										</div>
										<div className="flex space-x-6 mt-4">
											<Button
												className="font-extrabold bg-zinc-800 text-red-700"
												variant="outline"
												type="reset"
											>
												Cancel
											</Button>
											<Button
												className="font-extrabold bg-zinc-800 text-green-700"
												variant="outline"
												type="submit"
											>
												Generate
											</Button>
										</div>
									</div>
								</form>
							</CardContent>
						</Card>
					</div>

					<div className="md:col-span-2 border bg-zinc-800 md:rounded-lg py-4">
						<Table key={pendingWorkout.length} className=" ">
							<TableCaption className="text-indigo-500 font-sans font-semibold pt-4">
								Here's a list of exercises based on your search
							</TableCaption>
							<TableHeader>
								<TableRow className="gap-10">
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
								</TableRow>
							</TableHeader>
							{pendingWorkout.length === 0 ? (
								""
							) : (
								<>
									{pendingWorkout.map((exercise) => {
										return (
											<TableBody key={exercise.name}>
												<TableRow>
													<TableCell className="font-medium text-zinc-300">
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
								</>
							)}
						</Table>

						<div className="md:flex p-4 justify-end ">
							<Button
								className=" font-bold bg-green-700 "
								variant="outline"
								type="button"
								onClick={handleSubmitWorkout}
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateWorkout;
