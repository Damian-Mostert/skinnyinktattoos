import Image from "next/image";
import Link from "next/link";
import {links}from "@/data/links";
import { usePathname } from "next/navigation";
import Insta from "./insta";
import TikTok from "./tiktok";
import {Cairo_Play} from "next/font/google";
const cario = Cairo_Play({ subsets: ["latin"] })

export default function Footer(){
    const pathname = usePathname();
    return <footer className="master-box flex justify-center" style={{
        zIndex:60,
        background:"white"
    }}>
        <div className="p-8 flex flex-col">
            <Link href={"/"} className="flex items-center w-max pb-4 gap-2">
                <Image priority className="cursor-pointer w-20 h-20" alt="Skinny ink tatoos" src="/logo.webp" width={80} height={80}/>
                <h1 className={`${cario.className} font-extrabold text-nowrap text-2xl`}>Skinny ink tattoos</h1>
            </Link>
            <div className="header-links !bg-transparent w-full flex flex-col !gap-4 text-center">
                {links.map((link,index)=>(<>
                    <div key={link}>
                    <Link className={`${cario.className} ${pathname == `/${link}`?"active":""} link-no-line`}  alt={`Skiny ink tatoos - ${link}`} href={`/${link}`}>{link.replace(/-/g," ")}</Link>
                    </div>
                    {index < (links.length - 1) ? <div className="spacer-footer" key={`${link}_spacer`}/>:<></>}
                </>))}
            </div>
            <div className="flex justify-center gap-4 pt-8">
                <Insta/>
                <TikTok/>
            </div>
        </div> 
    </footer>
}