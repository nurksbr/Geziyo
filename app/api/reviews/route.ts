import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Review } from "@/models/Review";
import { Place } from "@/models/Place";

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { placeId, userName, rating, comment } = body;

        // Validation
        if (!placeId || !userName || !rating) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { success: false, error: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        // Create review
        const review = await Review.create({
            placeId,
            userName,
            rating,
            comment,
        });

        // Update place rating
        const place = await Place.findById(placeId);
        if (place) {
            const newRatingCount = place.ratingCount + 1;
            const newRating =
                (place.rating * place.ratingCount + rating) / newRatingCount;

            await Place.findByIdAndUpdate(placeId, {
                rating: newRating,
                ratingCount: newRatingCount,
            });
        }

        return NextResponse.json({
            success: true,
            data: review,
        });
    } catch (error: any) {
        console.error("Error creating review:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
