"use client";
import Machine from "@/components/machine"
import PreFooter from "@/components/preFooter"
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    image:"/custom-design.webp",
    title:"Custom Design",
    content:"Crafting one-of-a-kind designs based on your ideas and preferences",
    path:"/services?service=custom-design"
  },
  {
    image:"/cover-ups.webp",
    title:"Cover-ups",
    content:"Expertly concealing old tattoos with creative and seamless cover-up designs",
    path:"/services?service=cover-ups"
  },
  {
    image:"/fineline.webp",
    title:"Fine Line Tattoos",
    content:"Masterfully creating delicate and intricate designs with fine line tattooing techniques",
    path:"/services?service=fineline"
  }
]

export default function Home() {
	return (
		<>
    <div className="flex w-full" style={{height:"calc(calc(100vh - 80px) - var(--header-height))"}}>
			<style>{`:root{--splash-mask:#372c2b}`}</style>
			<header className="w-full h-full p-4 pt-10 lg:p-16 flex">
				<div className="w-full h-full rounded-3xl p-4 text-white  relative">
          <Image alt="Skiny ink tattos"  style={{
            filter: 'brightness(50%)',
          }} className="object-cover rounded-md" src={"/home-header.webp"} fill/>
					<div className="w-full h-full items-center flex flex-col gap-4 justify-center relative z-10">
          <h1 className="text-2xl lg:text-[3rem] font-extrabold">Skinny Ink Tattoos</h1>
					<h2 className="text-xl lg:text-3xl text-center">
						Artistry on Skin: Where Quality Meets Care
					</h2>
          <h2 className="text-xl lg:text-2xl text-center">
            Discover our intimate tattoo studio in Edenburg, Johannesburg offering friendly, reliable service for your homely tattoo experience. Book now for art that lasts a lifetime.
          </h2>
          </div>
				</div>
			</header>
		</div>
    <section className="w-full p-8 h-max text-center lg:px-32  text-white flex flex-wrap lg:flex-nowrap items-center justify-center">
      <div className="hover-just-pop flex flex-col items-center justify-center w-full bg-white text-black p-16 rounded-xl lg:-mr-36 z-10 relative shadow-2xl lg:h-[60vh]" >
        <h3 className="font-bold text-2xl lg:text-[2rem]">Crafting Art on Skin Canvas</h3>
        <h2 className="lg:text-xl text-center">        
        LEARN MORE ABOUT WHAT WE DO
        </h2>
        <h2 className="lg:text-xl text-center">
        Skinny Ink Tattoos is an exclusive solo artist business in Johannesburg. Offering a homely and reliable tattoo experience. Located in a small intimate private studio, we specialize in transforming the skin into works of art. Our friendly service and commitment to quality ensure that every client leaves with a unique piece that speaks volumes to them. Closed from Thursdays to Sundays, we are open from Monday to Wednesday 9:30-23:00, ready to bring your tattoo ideas to life.
        </h2>
      </div>
      <div className="hover-just-pop lg:min-h-0 w-full relative lg:h-[90vh] lg:bg-stone-400 rounded-xl lg:-ml-36">
        <Image alt="Skiny ink tattos" className="object-cover rounded-xl" src="/home-page-banner.webp" fill/>
      </div>
    </section>    
    <section className="header-locked-mobile w-full p-8 text-center lg:px-32 bg-black flex flex-col gap-4 bg-opacity-80 text-white" style={{marginBottom:"-4px"}}>
      <h3 className="font-bold text-2xl lg:text-[3rem]">Our Services</h3>
      <h2  className="text-center text-xl lg:text-3xl">
      We specialize in all types of tattoos
      </h2>
      <div className="w-full flex flex-wrap lg:h-full pb-10">
        {links.map((link,key)=>{
          return <div key={key} className="flex h-[400px] lg:h-full w-full lg:w-1/3">
            <div className="flex p-4 w-full h-full">
              <Link href={link.path} className="w-full h-full relative hover:scale-110 cursor-pointer" style={{
                transition:"all 0.4s"
              }}>
                <Image  alt="Skiny ink tattos"  style={{
                  filter: 'brightness(80%)',
                }} className="object-cover rounded-lg absolute top-0 left-0" src={link.image} fill/>
                <div className="relative z-10 flex flex-col h-full p-8 items-center justify-center">
                <h3 className="font-semibold text-3xl">{link.title}</h3>
                <p className="!text-center">{link.content}</p>
                </div>
              </Link>
            </div>
          </div>
        })}
      </div>
    </section>
   <PreFooter/>
    <Machine/>
    </>
	);
}
