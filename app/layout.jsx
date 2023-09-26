import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { light } from "@clerk/themes";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Geoffs Workout Helper",
	description: "Example Clerk App",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: light,
			}}
		>
			<html lang="en">
				<body className={inter.className}>
					<Header />

					<main className="container mx-auto">
						<div className="flex  justify-center min-h-screen">
							<div className="">{children}</div>
						</div>
					</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
