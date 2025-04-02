"use client";

import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import VideoPlayer from "@/components/splash";
import Splatter from "@/components/splatter";

import { usePathname } from "next/navigation";

import {Eczar} from "next/font/google"

const adventPro = Eczar({ subsets: ["latin"] });


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	return (
		<html lang="en">
			<head>
				<title>Skinny ink tattoos</title>
				<meta name="description" content="Get your ink today!"/>
				<link rel="icon" href="/logo.webp"/>
			</head>
			<body className={adventPro.className}>
				<VideoPlayer/>
				<Splatter/>
				<Header/>
				<main key={pathname}>
					{children}
				</main>
				<Footer/>
			</body>
		</html>
	);
}
