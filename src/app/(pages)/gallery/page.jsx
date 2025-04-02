"use client";
import { Cairo_Play } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tilt from 'react-parallax-tilt';
import PreFooter from "@/components/preFooter";
import Machine from "@/components/machine";

const cairo = Cairo_Play({ subsets: ["latin"] });

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then(async (res) => {
        const response = await res.json();
        setPhotos(response.result?.photos || []);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="p-6 text-black rounded-lg shadow-lg relative">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: "linear-gradient(transparent,transparent,rgba(0, 0, 0, 0.7))"
        }} />
        <h2 className={`text-3xl p-4 bg-white rounded-md font-bold mb-4 w-max mx-auto flex items-center gap-8 ${cairo.className}`}>
          Gallery
        </h2>
        {loading ? (
          <p className="text-gray-400 min-h-screen">Loading images...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : photos.length === 0 ? (
          <p className="text-gray-400">No photos available.</p>
        ) : (
          <div className="font-sans grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <Tilt key={index} tiltMaxAngleX={3} tiltMaxAngleY={3} className="p-4">
                <div className="bg-gray-100 rounded-lg shadow-md">
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                    alt={`Gallery Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                  <div className="p-4" dangerouslySetInnerHTML={photo.html_attributions[0]}>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}
      </section>
      <PreFooter />
      <Machine />
    </>
  );
}
