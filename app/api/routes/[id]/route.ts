import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Route } from "@/models/Route";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        const route = await Route.findById(id)
            .populate("steps.placeId")
            .populate("userPreferenceId");

        if (!route) {
            return NextResponse.json(
                { success: false, error: "Route not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: route,
        });
    } catch (error: any) {
        console.error("Error fetching route:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
