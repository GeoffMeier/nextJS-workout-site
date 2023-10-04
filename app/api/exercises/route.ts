import { NextRequest, NextResponse } from "next/server";
import {
	DifficultyLevel,
	TypeOfExercise,
	TypeOfMuscle,
} from "../../workout/_workout/exercises";

export const GET = async (req: NextRequest) => {
	let url = "https://api.api-ninjas.com/v1/exercises?";
	const outGoingSearchParams = new URLSearchParams();

	const searchParams = req.nextUrl.searchParams;

	const level = searchParams.get("difficultyLevel") as DifficultyLevel | null;
	if (level) {
		outGoingSearchParams.set("difficulty", level);
	}

	const exerciseType = searchParams.get(
		"exerciseType"
	) as TypeOfExercise | null;
	if (exerciseType) {
		outGoingSearchParams.set("type", exerciseType);
	}

	const muscleType = searchParams.get("muscleType") as TypeOfMuscle | null;
	if (muscleType) {
		outGoingSearchParams.set("muscle", muscleType);
	}

	const header = new Headers();
	header.set("X-Api-Key", process.env.EXERCISE_API_KEY ?? "");

	console.log(`${url}${outGoingSearchParams.toString()}`);
	const response = await fetch(`${url}${outGoingSearchParams.toString()}`, {
		headers: header,
	});
	if (response.ok === false) {
		return NextResponse.json({ error: true }, { status: response.status });
	}
	const data = await response.json();

	return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
	let url = "https://api.api-ninjas.com/v1/exercises?";
	const outGoingSearchParams = new URLSearchParams();

	const searchParams = await req.json();

	const level = searchParams.level as DifficultyLevel | null;
	if (level) {
		outGoingSearchParams.set("difficulty", level);
	}

	const exerciseType = searchParams.type as TypeOfExercise | null;
	if (exerciseType) {
		outGoingSearchParams.set("type", exerciseType);
	}

	const muscleType = searchParams.muscle as TypeOfMuscle | null;
	if (muscleType) {
		outGoingSearchParams.set("muscle", muscleType);
	}

	const header = new Headers();
	header.set("X-Api-Key", process.env.EXERCISE_API_KEY ?? "");

	console.log(`${url}${outGoingSearchParams.toString()}`);
	const response = await fetch(`${url}${outGoingSearchParams.toString()}`, {
		headers: header,
	});
	if (response.ok === false) {
		return NextResponse.json({ error: true }, { status: response.status });
	}
	const data = await response.json();
	console.log(data);
	return NextResponse.json(data);
};
