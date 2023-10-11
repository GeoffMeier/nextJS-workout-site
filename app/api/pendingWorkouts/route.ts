import { NextResponse } from "next/server";
import { db } from "../../_app/db";
import { LogExercises } from "../../_app/models/workout";

export async function GET(req) {
	const allWorkouts = await db().select().from(LogExercises);

	return NextResponse.json({ allWorkouts });
}

export async function POST(req: Request) {
	console.log("hit");
	const body = await req.json();
	console.log(body);
	await db().insert(LogExercises).values(body);

	return NextResponse.json({});
}
