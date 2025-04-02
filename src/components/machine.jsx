import Image from "next/image";
import "./machine.css";
export default function Machine({dir,from = "0vw",to = "90vw"}){
    return <div className="relative">
    <Image style={{
        "--from":from,
        "--to":to
    }} alt="Tattoo machine" className="machine" diriection={dir} width={150} height={150} src="/machine.gif"/>
    </div>
}