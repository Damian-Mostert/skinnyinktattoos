import axios from "axios";
import { NextResponse } from "next/server";

export const revalidate = 86400; // Cache for 1 day (86,400 seconds)

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ error: "Missing API key or Place ID" }, { status: 400 });
  }

  try {
    // First request: Get place details (reviews, photos)
    const detailsResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=reviews,photos&reviews.sort=newest&key=${apiKey}`
    );

    const photos = detailsResponse.data.result?.photos || [];

    // Fetch all photos as Base64
    const base64Images = await Promise.all(
      photos.map(async (photo) => {
        const photoReference = photo.photo_reference;
        if (!photoReference) return null;

        try {
          const photoResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`,
            { responseType: "arraybuffer" }
          );

          const base64Image = `data:image/jpeg;base64,${Buffer.from(photoResponse.data, "binary").toString("base64")}`;
          return base64Image;
        } catch (err) {
          console.error("Error fetching photo:", err);
          return null;
        }
      })
    );

    return NextResponse.json({ images: base64Images.filter(Boolean) }, {
      headers: {
        "Cache-Control": `s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`,
      },
    });
  } catch (error) {
    console.error("Error fetching Google Place Details:", error);
    return NextResponse.json({ error: "Failed to fetch place details" }, { status: 500 });
  }
}
