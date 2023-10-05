"use client";
import { Button } from "@/components/ui/button";
import { useAddWorkout, useWorkouts } from "./_workout/queries";
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

export default function workouts() {
	const [startWorkout, setStartWorkout] = useState({});
	const generateExercises = useAddWorkout();
	const workouts = useWorkouts();

	const handleClick = (e) => {
		workouts.data.allWorkouts.find((workout) => {
			workout.id === e.id ? setStartWorkout(workout) : "";
		});
	};

	if (workouts.loading) {
		return <div>loading...</div>;
	}
	if (workouts.error) {
		return <div>error retrieving workouts</div>;
	}

	return (
		<div className=" flex justify-center  bg-gradient-to-b from-zinc-950 to-gray-700">
			<div className="p-10 md:w-screen md:h-screen">
				<h2 className="text-indigo-500 text-center pb-10 font-semibold uppercase">
					Ready to Start Workouts
				</h2>
				{!startWorkout.id && (
					<div className="  border bg-zinc-800 md:rounded-lg py-4">
						<Table id="workouts" className=" ">
							<TableCaption className="text-indigo-500 font-sans font-semibold pt-4">
								Here's a list of workouts you have saved
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
									<TableHead className="text-indigo-500 font-sans font-bold"></TableHead>
								</TableRow>
							</TableHeader>
							{workouts.data.allWorkouts.map((workout) => (
								<>
									<TableBody key={workout.name}>
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
												<Button
													className="font-bold bg-green-700 rounded p-1  text-zinc-300"
													id={workout.id}
													onClick={handleClick}
													type="button"
												>
													Start Workout
												</Button>
											</TableCell>
										</TableRow>
									</TableBody>
								</>
							))}
						</Table>
					</div>
				)}

				{startWorkout.id && (
					<div className="  border bg-zinc-800 md:rounded-lg py-4">
						<Table id="workouts" className=" ">
							<TableCaption className="text-indigo-500 font-sans font-semibold pt-4">
								Enjoy your workout and make sure to hit finished when complete
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
									<TableHead className="text-indigo-500 font-sans font-bold"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody key={startWorkout.id}>
								<TableRow>
									<TableCell className="font-sm text-zinc-300">
										{startWorkout.name}
									</TableCell>

									<TableCell className="font-sm text-zinc-300">
										{startWorkout.muscle}
									</TableCell>
									<TableCell className="font-sm text-zinc-300">
										{startWorkout.type}
									</TableCell>
									<TableCell className="font-sm text-zinc-300">
										{startWorkout.level}
									</TableCell>
									<TableCell className="font-sm text-zinc-300">
										<Button
											className="font-bold bg-green-700 rounded p-1  text-zinc-300"
											id={startWorkout.id}
											onClick={handleClick}
											type="button"
										>
											Finish
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				)}
			</div>
		</div>
	);
}
