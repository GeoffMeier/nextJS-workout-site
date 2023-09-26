// components/BodyPartsExcersiseList.jsx
import React, { useEffect, useState } from "react";

const BodyPartsExerciseList = () => {
	const [bodyPartsExercise, setBodyPartsExercise] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const url =
				"https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10";
			const options = {
				method: "GET",
				headers: {
					"X-RapidAPI-Key":
						"db6a30d636mshd500784efa43cc9p1cbe02jsnb23499ed7a91",
					"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
				},
			};

			try {
				const response = await fetch(url, options);
				const data = await response.json();
				setBodyPartsExercise(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h2>Body Parts List</h2>
			<ul>
				{bodyPartsExercise.map((part, index) => (
					<li key={index}>{part.name}</li>
				))}
			</ul>
		</div>
	);
};

export default BodyPartsExerciseList;
