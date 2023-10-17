import { NextResponse } from "next/server";
import { db } from "../../_app/db";
import {
	LogExercises,
	workoutHistory,
	workouts,
} from "../../_app/models/workout";

export async function GET(req) {
	const allWorkouts = await db().select().from(workoutHistory);

	return NextResponse.json({ allWorkouts });
}

export async function POST(req: Request) {
	console.log("hit");
	const body = await req.json();
	console.log(body);
	await db().insert(workoutHistory).values(body);

	return NextResponse.json({});
}
