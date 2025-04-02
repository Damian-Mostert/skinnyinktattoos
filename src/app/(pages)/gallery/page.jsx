"use client";
import {Cairo_Play} from "next/font/google";
const cario = Cairo_Play({ subsets: ["latin"] })
export default function Home() {
	return (
		<section className="p-4 text-white">
		<h2 className={`text-3xl ${cario.className}`}>Gallery</h2>
		</section>
	);
}
