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
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=reviews&reviews.sort=newest&key=${apiKey}`
      );
      

    return NextResponse.json(response.data, {
      headers: {
        "Cache-Control": `s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`,
      },
    });
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
