import { Schema, model, models, Document } from "mongoose";

export interface IPlace extends Document {
    name: string;
    slug: string;
    city: string;
    description?: string;
    images: string[];
    category: string;
    priceLevel: number;
    audience: string[];
    rating: number;
    ratingCount: number;
    location: {
        type: string;
        coordinates: [number, number]; // [lng, lat]
    };
    createdAt: Date;
    updatedAt: Date;
}

const PlaceSchema = new Schema<IPlace>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        city: { type: String, required: true },
        description: { type: String },
        images: [{ type: String }],
        category: { type: String, required: true },
        priceLevel: { type: Number, min: 1, max: 5, required: true },
        audience: [{ type: String }],
        rating: { type: Number, min: 0, max: 5, default: 0 },
        ratingCount: { type: Number, default: 0 },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
    },
    { timestamps: true }
);

// Geospatial index for location-based queries
PlaceSchema.index({ location: "2dsphere" });
PlaceSchema.index({ city: 1, category: 1 });
PlaceSchema.index({ slug: 1 });

export const Place = models.Place || model<IPlace>("Place", PlaceSchema);
