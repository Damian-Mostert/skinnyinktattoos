"use client";
import Machine from "@/components/machine";
import { Cairo_Play } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tilt from 'react-parallax-tilt';
const cairo = Cairo_Play({ subsets: ["latin"] });
import PreFooter from "@/components/preFooter";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/reviews").then(async res => {
      const response = await res.json();
	  console.log(response?.result?.reviews)
      setReviews(response.result?.reviews || []);
    }).catch(e => {
      setError(e.message);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="p-6 text-black rounded-lg shadow-lg relative">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: "linear-gradient(transparent,transparent,rgba(0, 0, 0, 0.7))"
        }}/>
        <h2 className={`text-3xl p-4 bg-white rounded-md font-bold mb-4 w-max mx-auto flex items-center gap-8 ${cairo.className}`}>
          Testimonials
        </h2>
        <Link target="_blank" className="hidden lg:flex absolute right-10 top-6 text-2xl text-yellow-500 p-4 rounded-lg bg-white" href={process.env.NEXT_PUBLIC_GOOGLE_LINK}>Leave a review</Link>
        {loading ? (
          <p className="text-gray-400 min-h-screen">Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-400">No reviews available.</p>
        ) : (
          <div className="font-sans flex flex-wrap justify-center">
            {reviews.map((review, masterKey) => (
              <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} className="w-full lg:w-1/2 p-4 flex h-max" key={masterKey}>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full">
                  <div className="flex items-center space-x-4">
                    {review.profile_photo_url && (
                      <Image
                        width={50}
                        height={50}
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                      />
                    )}
                    <div>
                      <h4 className="text-lg font-semibold">{review.author_name}</h4>
                      <p className="text-sm text-black">{review.relative_time_description}</p>
                    </div>
                  </div>
                  <p className="mt-2">{review.text}</p>
                  {review.photos && review.photos.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {review.photos.map((photo, index) => (
                        <Image key={index} src={photo} alt={`Review Image ${index + 1}`} width={150} height={150} className="rounded-lg object-contain" />
                      ))}
                    </div>
                  )}
                  <div className="mt-4" style={{height:"1px", width:"100%", background:"#ddd"}}/>
                  <div className="mt-4 text-yellow-400 text-2xl flex gap-4">
                    {Array.from({ length: review.rating }).map((_, key) => (
                      <Link alt="Skiny ink tattoos" target="_blank" href={process.env.NEXT_PUBLIC_GOOGLE_LINK} key={key} style={{ animationDelay: `${masterKey + key * 0.1}s` }} className="pop-effect">★</Link>
                    ))}
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}
        <div className="w-full flex mb-8 relative z-10">
          <Link target="_blank" className="mt-8 mx-auto text-2xl text-yellow-500 p-4 rounded-lg bg-white" href={process.env.NEXT_PUBLIC_GOOGLE_LINK}>Leave a review</Link>
        </div>
      </section>
      <PreFooter/>
      <Machine/>
    </>
  );
}
