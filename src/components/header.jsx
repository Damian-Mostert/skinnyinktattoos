import "./header.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {links}from "@/data/links";
import { useEffect, useRef, useState } from "react";
import Insta from "./insta"
import TickTok from "./tiktok"
import {Cairo_Play} from "next/font/google";
const cario = Cairo_Play({ subsets: ["latin"] })
export default function Header(){
    const pathname = usePathname();
    const headerRef = useRef();
    const [height,setHeight] = useState(0);

    useEffect(()=>{
        if(headerRef.current){
            setHeight(headerRef.current.getBoundingClientRect().height
            )
        }
    },[headerRef]);

    const [updated,setUpdated] = useState(0);

    useEffect(()=>{
        setUpdated(i=>i+1)
    },[pathname])

    const doInstantAnimation = updated > 1;

    return <>
    <div ref={headerRef} className={`w-full h-max flex lg:p-2 header master-box ${cario.className}`}>
        <nav className="flex items-center flex-col lg:flex-row lg:rounded-lg w-full">
            <Link href={"/"} className="header-logo p-1 lg:p-0">
                <Image key={pathname} className="relative logo-pop" style={{
                    ...doInstantAnimation?{
                        "--pop-delay":"0s"
                    }:{}
                }} alt="Skinny ink tatoos" src="/logo.webp" width={100} height={100}/>
                <div className="items-center flex" style={{width:"calc(100% + 100px)",marginLeft:"-100px",paddingLeft:"120px"}}><h1 className={cario.className}>Skinny ink tattoos</h1></div>
                <div className="px-4 relative gap-2 flex lg:hidden">
                <Insta/>
                <TickTok/>
            </div>
            </Link>
            <div className="header-links items-center shadow-lg h-12 !px-4 bg-stone-400 lg:rounded-lg lg:!w-max" style={{"--link-color":"white"}}>
                {links.map((link,index)=>(<>
                    <Link key={index} className={` text-white ${pathname == `/${link}`?"active":""}`}  alt={`Skiny ink tatoos - ${link}`} href={`/${link}`}>{link.replace(/-/g," ")}</Link>
                    {(index < (links.length-1))?<div key={`${link}_spacer`} className={`spacer`}/>:<></>}
                </>))}
            </div>
            <div className="relative ml-auto gap-4 hidden lg:flex master-box items-center rounded-md justify-center" style={{
                width:"14em",
                height:"4rem"
            }}>
                <Insta/>
                <TickTok/>
            </div>
        </nav>
    </div>
    <style>{`:root{--header-height:${height}px}`}</style>
    <div style={{height}}/>
    </>
}