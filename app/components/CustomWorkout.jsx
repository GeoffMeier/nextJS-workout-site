// import { useEffect, useState } from "react";

// const CustomWorkout = () => {
// 	const [time, setTime] = useState("");
// 	const [equipment, setEquipment] = useState("");
// 	const [muscle, setMuscle] = useState("");
// 	const [level, setLevel] = useState("");
// 	const [goal, setGoal] = useState("");
// 	const [workout, setWorkout] = useState({});

// 	const url = `https://workout-planner1.p.rapidapi.com/customized?time=${time}&equipment=${equipment}&muscle=${muscle}&fitness_level=${level}&fitness_goals=${goal}`;

// 	const fetchData = async () => {
// 		try {
// 			const res = await fetch(url, {
// 				method: "GET",
// 				headers: {
// 					"X-RapidAPI-Key":
// 						"db6a30d636mshd500784efa43cc9p1cbe02jsnb23499ed7a91",
// 					"X-RapidAPI-Host": "workout-planner1.p.rapidapi.com",
// 				},
// 			});
// 			const result = res.text();
// 			console.log(result);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};
// 	useEffect(() => {
// 		fetchData();
// 	}, []);
// 	return (
// 		<div>
// 			<ul>
// 				{/* {workout && workout.map((e) => {
//                     return (
//                         <li>
//                             {e.}
//                         </li>
//                     )
//                 })} */}
// 			</ul>
// 		</div>
// 	);
// };

// export default CustomWorkout;
