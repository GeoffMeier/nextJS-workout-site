"use client";

import { useWorkouts } from "./_workout/queries";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import React, { useState } from "react";

export default function workouts() {
	const workouts = useWorkouts();

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
