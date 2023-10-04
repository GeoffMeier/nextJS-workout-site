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

import { useWorkouts } from "../_workout/queries";

import workouts from "../page";
export default function startWorkout() {
	console.log(workouts.apply());
	return (
		<div className=" flex justify-center  bg-gradient-to-b from-zinc-950 to-gray-700">
			<div className="p-10 md:w-screen md:h-screen">
				<h2 className="text-indigo-500 text-center pb-10 font-semibold uppercase">
					Ready to Start Workouts
				</h2>
				<div className="  border bg-zinc-800 md:rounded-lg py-4">
					<Table id="workouts" className=" ">
						<TableCaption className="text-indigo-500 font-sans font-semibold pt-4">
							Here's a list of workouts you have saved
						</TableCaption>
						<TableHeader>
							<TableRow className="gap-10">
								<TableHead className="text-indigo-500 font-sans font-bold">
									Exercise Name
								</TableHead>
								<TableHead className="text-indigo-500 font-sans font-bold">
									Instructions
								</TableHead>
								<TableHead className="text-indigo-500 font-sans font-bold">
									Weight
								</TableHead>
								<TableHead className="text-indigo-500 font-sans font-bold">
									Sets
								</TableHead>
								<TableHead className="text-indigo-500 font-sans font-bold">
									Reps
								</TableHead>
							</TableRow>
						</TableHeader>

						{workouts.workoutInProgress &&
							workouts.workoutInProgress.map((workout) => (
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
												<Link
													className="font-bold bg-green-700 rounded p-1  text-zinc-300"
													href="/workout/start"
												>
													Start Workout
												</Link>
											</TableCell>
										</TableRow>
									</TableBody>
								</>
							))}
					</Table>
				</div>
			</div>
		</div>
	);
}
