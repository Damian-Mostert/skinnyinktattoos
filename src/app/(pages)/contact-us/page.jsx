"use client";
import {Cairo_Play} from "next/font/google";
const cario = Cairo_Play({ subsets: ["latin"] })
export default function ContactUs() {
	return (
		<section className="p-4 text-white">
			<style>{`:root{--splash-mask:#372c2b}`}</style>
			<h2 className={`text-3xl ${cario.className}`}>Contact us</h2>
		</section>
	);
}
