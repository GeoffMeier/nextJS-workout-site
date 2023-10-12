export const typeOfExercise = {
	cardio: "cardio",
	olympic_weightlifting: "olympic_weightlifting",
	plyometrics: "plyometrics",
	powerlifting: "powerlifting",
	strength: "strength",
	stretching: "stretching",
	strongman: "strongman",
} as const;

export type TypeOfExercise =
	(typeof typeOfExercise)[keyof typeof typeOfExercise];

export const typeOfMuscle = {
	abdominals: "abdominals",
	abductors: "abductors",
	adductors: "adductors",
	biceps: "biceps",
	calves: "calves",
	chest: "chest",
	forearms: "forearms",
	glutes: "glutes",
	hamstrings: "hamstrings",
	lats: "lats",
	lower_back: "lower_back",
	middle_back: "middle_back",
	neck: "neck",
	quadriceps: "quadriceps",
	traps: "traps",
	triceps: "triceps",
} as const;

export type TypeOfMuscle = (typeof typeOfMuscle)[keyof typeof typeOfMuscle];

export const difficultyLevel = {
	beginner: "beginner",
	intermediate: "intermediate",
	expert: "expert",
} as const;

export type DifficultyLevel =
	(typeof difficultyLevel)[keyof typeof difficultyLevel];

export type Exercise = {
	name: string;
	type: TypeOfExercise;
	muscle: TypeOfMuscle;
	equipment: string;
	difficulty: DifficultyLevel;
	instructions: string;
};
export type ExerciseLog = {
	name: string;
	sets: string;
	reps: string;
	weight: string;
	workoutName: string;
};
export type NewExercise = Pick<
	Exercise,
	"name" | "type" | "muscle" | "difficulty"
>;
export type NewExerciseLog = Pick<
	ExerciseLog,
	"name" | "sets" | "reps" | "weight" | "workoutName"
>;

export type PendingWorkout = {
	name: string;
	type: TypeOfExercise;
	muscle: TypeOfMuscle;
	difficulty: DifficultyLevel;
	instructions: string;
	sets: string;
	reps: string;
	weight: string;
};
