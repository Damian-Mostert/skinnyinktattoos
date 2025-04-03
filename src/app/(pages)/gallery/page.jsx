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
    fetch("/api/images")
      .then(async (res) => {
        const response = await res.json();
        setPhotos(response.images || []);
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
      <section className="p-2 lg:p-6 text-black rounded-lg shadow-lg relative">
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
          <div className="font-sans w-full flex flex-wrap justify-center">
            {photos.map((photo, index) => (
              <Tilt key={index} tiltMaxAngleX={3} tiltMaxAngleY={3} className="p-4">
                <div className="w-full lg:1/3 h-full flex justify-center items-center">
                  <img
                    src={photo}
                    alt={`Gallery Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover"
                  />
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
