import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Place } from "@/models/Place";
import { Review } from "@/models/Review";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;
        const place = await Place.findOne({ slug });

        if (!place) {
            return NextResponse.json(
                { success: false, error: "Place not found" },
                { status: 404 }
            );
        }

        // Fetch reviews for this place
        const reviews = await Review.find({ placeId: place._id })
            .sort({ createdAt: -1 })
            .limit(20);

        return NextResponse.json({
            success: true,
            data: {
                place,
                reviews,
            },
        });
    } catch (error: any) {
        console.error("Error fetching place:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
