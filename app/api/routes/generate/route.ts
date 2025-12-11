import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { UserPreference } from "@/models/UserPreference";
import { Route } from "@/models/Route";
import { Place } from "@/models/Place";

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { userType, durationHours, budgetLevel, categories, walkingPreference, city } = body;

        // Validation
        if (!userType || !durationHours || !city) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Save user preference
        const userPreference = await UserPreference.create({
            userType,
            durationHours,
            budgetLevel: budgetLevel || 3,
            categories: categories || [],
            walkingPreference: walkingPreference || "medium",
        });

        // Build query for places
        const query: any = {
            city,
            audience: { $in: [userType] }, // audience is an array, userType is a string
        };

        if (budgetLevel) {
            query.priceLevel = { $lte: budgetLevel };
        }

        if (categories && categories.length > 0) {
            query.category = { $in: categories };
        }

        // Debug logging
        console.log('🔍 Route generation query:', JSON.stringify(query, null, 2));

        // Fetch suitable places
        const places = await Place.find(query).sort({ rating: -1 }).limit(20);

        console.log(`📍 Found ${places.length} places`);

        if (places.length === 0) {
            return NextResponse.json(
                { success: false, error: "No suitable places found" },
                { status: 404 }
            );
        }

        // Simple algorithm: select places based on duration
        // Assume 2 hours per place on average
        const numberOfStops = Math.min(
            Math.ceil(durationHours / 2),
            places.length
        );

        const selectedPlaces = places.slice(0, numberOfStops);

        // Create route steps
        const steps = selectedPlaces.map((place, index) => ({
            placeId: place._id,
            order: index + 1,
            recommendedDurationMinutes: Math.floor((durationHours * 60) / numberOfStops),
        }));

        // Save route
        const route = await Route.create({
            userPreferenceId: userPreference._id,
            city,
            steps,
        });

        // Populate the route with place details
        const populatedRoute = await Route.findById(route._id).populate("steps.placeId");

        return NextResponse.json({
            success: true,
            data: {
                routeId: route._id,
                route: populatedRoute,
            },
        });
    } catch (error: any) {
        console.error("Error generating route:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
