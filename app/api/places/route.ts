import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Place } from "@/models/Place";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const city = searchParams.get("city");
        const userType = searchParams.get("userType");
        const category = searchParams.get("category");
        const maxDistance = searchParams.get("maxDistance");
        const lng = searchParams.get("lng");
        const lat = searchParams.get("lat");

        // Build query
        const query: any = {};

        if (city) {
            query.city = city;
        }

        if (userType) {
            query.audience = userType;
        }

        if (category) {
            query.category = category;
        }

        // Geospatial query if coordinates provided
        if (lng && lat && maxDistance) {
            query.location = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)],
                    },
                    $maxDistance: parseInt(maxDistance), // in meters
                },
            };
        }

        const places = await Place.find(query).sort({ rating: -1 }).limit(50);

        return NextResponse.json({
            success: true,
            count: places.length,
            data: places,
        });
    } catch (error: any) {
        console.error("Error fetching places:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
