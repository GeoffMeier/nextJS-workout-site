"use client";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const Header = ({ username }) => {
	const { isLoaded, isSignedIn, user } = useUser();
	return (
		<nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-indigo-700 to-gray-950">
			<div className="flex items-center">
				<Link href="/">
					<div className="text-lg font-bold text-slate-300 uppercase">
						The Workout Builder
					</div>
				</Link>
			</div>
			<div className="flex items-center text-white">
				{!isLoaded ||
					(!isSignedIn && (
						<>
							<Link
								href="sign-in"
								className="text-gray-300 hover:text-white mr-4"
							>
								Sign In
							</Link>
							<Link
								href="sign-up"
								className="text-gray-300 hover:text-white mr-4"
							>
								Sign Up
							</Link>
						</>
					))}
				{isLoaded ||
					(isSignedIn && (
						<Link
							href="profile"
							className="text-gray-300 hover:text-white mr-4"
						>
							Profile
						</Link>
					))}
				<div className="ml-auto">
					<UserButton afterSignOutUrl="/" />
				</div>
			</div>
		</nav>
	);
};

export default Header;
