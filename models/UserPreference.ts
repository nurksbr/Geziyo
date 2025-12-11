import { Schema, model, models, Document } from "mongoose";

export type UserType = "family" | "young" | "solo" | "tourist";
export type WalkingPreference = "low" | "medium" | "high";

export interface IUserPreference extends Document {
    userType: UserType;
    durationHours: number;
    budgetLevel: number;
    categories: string[];
    walkingPreference: WalkingPreference;
    createdAt: Date;
    updatedAt: Date;
}

const UserPreferenceSchema = new Schema<IUserPreference>(
    {
        userType: {
            type: String,
            enum: ["family", "young", "solo", "tourist"],
            required: true,
        },
        durationHours: { type: Number, required: true },
        budgetLevel: { type: Number, min: 1, max: 5 },
        categories: [{ type: String }],
        walkingPreference: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
    },
    { timestamps: true }
);

export const UserPreference =
    models.UserPreference || model<IUserPreference>("UserPreference", UserPreferenceSchema);
