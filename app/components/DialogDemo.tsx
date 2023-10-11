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
import { ExerciseLog, NewExerciseLog } from "../workout/_workout/exercises";
import { useState } from "react";
import { useAddExerciseLog } from "../workout/_workout/queries";

export function DialogDemo({ name, description }) {
	const initialLog: NewExerciseLog = {
		name: name,
		sets: "",
		reps: "",
		weight: "",
	};

	const [log, setLog] = useState<NewExerciseLog>(initialLog);
	const [isSaved, setIsSaved] = useState(false); // State to track if changes are saved
	const addExerciseMutation = useAddExerciseLog();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { name, sets, reps, weight } = log;

		try {
			// Save the exercise log to the database using the mutation
			const res = await addExerciseMutation.mutateAsync({
				name,
				sets,
				reps,
				weight,
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

	console.log(log);

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

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle
						onChange={() => {
							setLog({
								...log,
								name: name,
							});
						}}
					>
						{name}
					</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="Sets" className="text-center">
							Sets
						</Label>
						<Input
							id="sets"
							value={log.sets}
							onChange={(e) => {
								setLog({
									...log,
									sets: e.target.value,
								});
							}}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="Reps" className="text-center">
							Reps
						</Label>
						<Input
							id="Reps"
							value={log.reps}
							className="col-span-3"
							onChange={(e) => {
								setLog({
									...log,
									reps: e.target.value,
								});
							}}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="Weight" className="text-center">
							Weight
						</Label>
						<Input
							id="Weight"
							value={log.weight}
							className="col-span-3"
							onChange={(e) => {
								setLog({
									...log,
									weight: e.target.value,
								});
							}}
						/>
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
