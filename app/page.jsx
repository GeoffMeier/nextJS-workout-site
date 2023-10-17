"use client";
import { useUser } from "@clerk/nextjs";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { ListItem } from "@radix-ui/react-navigation-menu";
import React from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { HomeIcon } from "@radix-ui/react-icons";

const components = [
	{
		title: "Create a workout",
		href: "/workout/create",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Workouts",
		href: "/workout",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "History",
		href: "/workout/history",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "goals",
		href: "/docs/primitives/scroll-area",
		description: "Visually or semantically separates content.",
	},
	{
		title: "random",
		href: "/docs/primitives/tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		href: "/docs/primitives/tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

export default function Page() {
	const { isLoaded, isSignedIn, user } = useUser();

	if (!isLoaded || !isSignedIn) {
		return null;
	}

	return (
		<>
			<div
				className="relative min-h-screen w-screen bg-cover bg-gradient-to-b bg-center bg-fixed"
				style={{
					backgroundImage: `url('https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1700&h=800&dpr=1')`,
					filter: "brightness(0.7)", // Make the image less visible
				}}
			>
				<div className="absolute inset-0 bg-black opacity-60"></div>
				<div className="md:container mx-auto h-full relative z-10 flex flex-col justify-center items-center text-white pt-4">
					<h2 className="text-4xl font-semibold mb-4 uppercase">
						Welcome back {user.username}
					</h2>

					<NavigationMenu className="mb-4">
						<NavigationMenuList className="gap-x-10 text-md">
							<NavigationMenuItem className="">
								<NavigationMenuTrigger className="text-md flex justify-between  text-white bg-inherit  ">
									Home
								</NavigationMenuTrigger>
								<NavigationMenuContent className="flex justify-center ">
									<ul className="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
										<li className="row-span-3 rounded-md bg-gradient-to-t from-slate-400 to-slate-300">
											<NavigationMenuLink asChild>
												<a
													className="flex h-full w-full select-none flex-col justify-end rounded-md hover:bg-gradient-to-b from-slate-50 to-muted p-6 no-underline outline-none focus:shadow-md"
													href="/"
												>
													<HomeIcon className="h-6 w-6" />
													<div className="mb-2 mt-4 text-lg font-medium">
														Home
													</div>
													<p className="text-sm leading-tight text-muted-foreground">
														Beautifully designed components built with Radix UI
														and Tailwind CSS.
													</p>
												</a>
											</NavigationMenuLink>
										</li>
										<li className="hover:rounded-md hover:bg-gradient-to-t hover:from-slate-300 hover:to-slate-300">
											<NavigationMenuLink>
												<a className="text-blue-600" href="/about">
													About the app
													<span className="text-xs flex text-black">
														Learn about me and what inspired me to create this
														application{" "}
													</span>
												</a>
											</NavigationMenuLink>
										</li>
										<li className="hover:rounded-md hover:bg-gradient-to-t hover:from-slate-300 hover:to-slate-300 ">
											<NavigationMenuLink>
												<a className="text-blue-600" href="/about">
													About me
													<span className="text-xs flex text-black">
														Learn about me and what inspired me to create this
														application{" "}
													</span>
												</a>
											</NavigationMenuLink>
										</li>
										<li className="hover:rounded-md hover:bg-gradient-to-t hover:from-slate-300 hover:to-slate-300">
											<NavigationMenuLink>
												<a className="text-blue-600" href="/about">
													About me
													<span className="text-xs flex text-black">
														Learn about me and what inspired me to create this
														application{" "}
													</span>
												</a>
											</NavigationMenuLink>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="text-md flex justify-between  text-white bg-inherit ">
									Menu
								</NavigationMenuTrigger>
								<NavigationMenuContent className="flex justify-center">
									<ul className="grid md:w-[400px] gap-4 p-4 lg:w-[500px] md:grid-cols-2  ">
										{components.map((component) => (
											<li
												key={component.title}
												className="hover:rounded-md hover:bg-gradient-to-t hover:from-slate-300 hover:to-slate-300"
											>
												<a
													className="text-md text-blue-600"
													key={component.title}
													title={component.title}
													href={component.href}
												>
													{component.title}
													<span className="text-xs flex text-black">
														{component.description}
													</span>
												</a>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem className=" hover:border-2 hover:border-slate-300 hover:background-slate-300 hover:bg-slate-500 rounded-full">
								<Link href="/docs" legacyBehavior passHref>
									<NavigationMenuLink className="">History</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							{/* Additional navigation items */}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
		</>
	);
}
