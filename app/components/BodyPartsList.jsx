// components/BodyPartsList.jsx
import { useEffect, useState } from "react";

const BodyPartsList = () => {
	const [bodyParts, setBodyParts] = useState([]);
	const apiUrl = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiUrl, {
					method: "GET",
					headers: {
						"X-RapidAPI-Key":
							"db6a30d636mshd500784efa43cc9p1cbe02jsnb23499ed7a91",
						"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
					},
				});

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setBodyParts(data);
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
				{bodyParts.map((part, index) => (
					<li key={index}>{part}</li>
				))}
			</ul>
		</div>
	);
};

export default BodyPartsList;
