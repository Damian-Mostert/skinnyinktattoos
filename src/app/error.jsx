"use client";

export default function Error(){
    return <div className="w-screen h-screen flex justify-center items-center text-3xl text-red-500 font-extrabold">
       <div className="p-4 bg-stone-800 rounded-2xl">
           Whoops! there was an error.
       </div>
    </div>
}