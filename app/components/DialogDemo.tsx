import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewHistory } from "../workout/_workout/exercises";
import { useState } from "react";
import { useAddHistory } from "../workout/_workout/queries";

export function DialogDemo({
	name,

	description,
	workoutName,
	workoutID,
}) {
	const initialLog: NewHistory = {
		workoutName: workoutName,
		workoutId: workoutID,
		exercises: {
			name: name,
			sets: "",
			reps: "",
			weight: "",
		},
	};

	const [log, setLog] = useState<NewHistory>(initialLog);
	const [isSaved, setIsSaved] = useState(false); // State to track if changes are saved
	const addExerciseMutation = useAddHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("hit ");
		const { workoutName, workoutId, exercises } = log;

		try {
			// Save the exercise log to the database using the mutation
			const res = await addExerciseMutation.mutateAsync({
				workoutId,
				workoutName,
				exercises,
			});

			// Process the response as needed
			const savedLog = await res.json();
			console.log("Saved exercise log:", savedLog);

			// Update the state to indicate changes are saved
			setIsSaved(true);
		} catch (error) {
			console.error("Error saving exercise log:", error);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					type="button"
					className="bg-indigo-700 text-zinc-950"
				>
					Read Me
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[605px] ">
				<DialogHeader>
					<DialogTitle
						onChange={() => {
							setLog({
								...log,
								workoutName: name,
							});
						}}
					>
						{name}
					</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4 justify-center text-center">
					<div className="grid grid-cols-4  items-center gap-4 text-center">
						<Label htmlFor="Sets" className="text-center">
							Sets
						</Label>
						{isSaved ? (
							<Input
								id="sets"
								value={log.exercises.sets}
								className="col-span-1 bg-green-500"
							/>
						) : (
							<Input
								id="sets"
								value={log.exercises.sets}
								onChange={(e) => {
									setLog({
										...log,
										exercises: {
											name: log.exercises.name,
											reps: log.exercises.reps,
											weight: log.exercises.weight,
											sets: e.target.value,
										},
									});
								}}
								className="col-span-1"
							/>
						)}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="Reps" className="text-center">
							Reps
						</Label>
						{isSaved ? (
							<Input
								id="reps"
								value={log.exercises.reps}
								className="col-span-1 bg-green-500"
							/>
						) : (
							<Input
								id="reps"
								value={log.exercises.reps}
								onChange={(e) => {
									setLog({
										...log,
										exercises: {
											name: log.exercises.name,
											sets: log.exercises.sets,
											weight: log.exercises.weight,
											reps: e.target.value,
										},
									});
								}}
								className="col-span-1"
							/>
						)}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="Weight" className="text-center">
							Weight
						</Label>
						{isSaved ? (
							<Input
								id="weight"
								value={log.exercises.weight}
								className="col-span-1 bg-green-500"
							/>
						) : (
							<Input
								id="weight"
								value={log.exercises.weight}
								onChange={(e) => {
									setLog({
										...log,
										exercises: {
											name: log.exercises.name,
											sets: log.exercises.sets,
											reps: log.exercises.reps,
											weight: e.target.value,
										},
									});
								}}
								className="col-span-1"
							/>
						)}
					</div>
				</div>
				<DialogFooter>
					{isSaved ? ( // Conditionally render the button based on the isSaved state
						<Button
							id="butt"
							type="button"
							className="bg-green-500" // Add the green background style
						>
							Saved
						</Button>
					) : (
						<Button id="butt" onClick={handleSubmit} type="button">
							Save changes
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
