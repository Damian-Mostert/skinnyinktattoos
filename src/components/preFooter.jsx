import Image from "next/image";

export default function PreFooter(){
    return <div className="relative h-80 w-full">
    <Image alt="Skinny ink tattoos" fill className="object-cover" style={{
      objectPosition:"0px -260px",
      opacity:0.7
    }} src={"/home-footer.webp"}/>
    <div style={{
      color:"black",
      fontSize:"7rem"
    }} className="w-full flex justify-center items-center absolute h-full top-0 left-0 bg-white bg-opacity-60">
      <span style={{transform:"translateY(40px)"}}>“</span>
    </div>
</div>
}