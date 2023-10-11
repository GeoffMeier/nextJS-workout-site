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

import { usePendingWorkouts, useWorkouts } from "../_workout/queries";

export default function startWorkout() {
	const workouts = usePendingWorkouts();
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
					BEGIN workout
				</h2>
				<div className="  border bg-zinc-800 md:rounded-lg py-4">
					<Table id="workouts" className=" ">
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
									level
								</TableHead>
							</TableRow>
						</TableHeader>

						{workouts.data.allWorkouts.map((workout) => (
							<>
								<TableBody key={workout.id}>
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
