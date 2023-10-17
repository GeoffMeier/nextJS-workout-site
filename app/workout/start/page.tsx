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

import { useAddWorkout, useWorkouts } from "../_workout/queries";
import { useSearchParams } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function startWorkout() {
	const [isStarted, setStarted] = useState(false);
	const searchParams = useSearchParams();

	const id = searchParams.get("id");

	console.log(id);
	const generateExercises = useAddWorkout();
	const workouts = useWorkouts();
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
											<form>
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
															htmlFor="name"
														>
															Exercise Type
														</Label>
														<Input
															className="bg-zinc-800 text-white"
															id="name"
															value={workout.type}
															readOnly
														/>
													</div>
													<div className="flex flex-col space-y-1.5 ">
														<Label
															className="font-semibold text-indigo-500"
															htmlFor="name"
														>
															Level
														</Label>
														<Input
															className="bg-zinc-800 text-white"
															id="name"
															value={workout.level}
															readOnly
														/>
													</div>
													<div className="flex flex-col space-y-1.5 ">
														<Label
															className="font-semibold text-indigo-500"
															htmlFor="name"
														>
															Muscle
														</Label>
														<Input
															className="bg-zinc-800 text-white"
															id="name"
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

			{workouts.data.allWorkouts.map(
				(workout) =>
					// 	workout.id === id ? (
					// 		<div className=" flex justify-center  bg-gradient-to-b from-zinc-950 to-gray-700">
					// 			<div className="p-10 md:w-screen md:h-screen">
					// 				<h2 className="text-indigo-500 text-center pb-10 font-semibold uppercase">
					// 					{workout.name} Started
					// 				</h2>
					// 				<div className="  border bg-zinc-800 md:rounded-lg py-4">
					// 					<Table id="workouts" className=" ">
					// 						<TableHeader>
					// 							<TableRow className="gap-10">
					// 								<TableHead className="text-indigo-500 font-sans font-bold">
					// 									Workout Details
					// 								</TableHead>
					// 								<TableHead className="text-indigo-500 font-sans font-bold">
					// 									Name
					// 								</TableHead>
					// 								<TableHead className="text-indigo-500 font-sans font-bold">
					// 									Muscle
					// 								</TableHead>
					// 								<TableHead className="text-indigo-500 font-sans font-bold">
					// 									Type
					// 								</TableHead>
					// 								<TableHead className="text-indigo-500 font-sans font-bold">
					// 									level
					// 								</TableHead>
					// 							</TableRow>
					// 						</TableHeader>
					// 						<TableBody key={workout.name}>
					// 							<TableRow>
					// 								<TableCell className="font-sm text-zinc-300">
					// 									{/* <DialogDemo name={}/> */}
					// 								</TableCell>
					// 								<TableCell className="font-sm text-zinc-300">
					// 									{workout.name}
					// 								</TableCell>

					// 								<TableCell className="font-sm text-zinc-300">
					// 									{workout.muscle}
					// 								</TableCell>
					// 								<TableCell className="font-sm text-zinc-300">
					// 									{workout.type}
					// 								</TableCell>
					// 								<TableCell className="font-sm text-zinc-300">
					// 									{workout.level}
					// 								</TableCell>
					// 							</TableRow>
					// 						</TableBody>
					// 					</Table>
					// 				</div>
					// 			</div>
					// 		</div>
					// 	) : (
					// 		""
					// 	)

					""
			)}
		</>
	);
}
