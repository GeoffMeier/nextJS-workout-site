import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { light } from "@clerk/themes";
import Header from "./_app/Header";
import Providers from "./_app/Providers";

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
					<Providers>
						<Header />

						<main className="container mx-auto">
							<div className="flex items-start justify-center min-h-screen md:max-w-screen">
								<div className="">{children}</div>
							</div>
						</main>
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
