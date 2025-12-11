import { Schema, model, models, Document, Types } from "mongoose";

export interface IRouteStep {
    placeId: Types.ObjectId;
    order: number;
    recommendedDurationMinutes: number;
}

export interface IRoute extends Document {
    userPreferenceId: Types.ObjectId;
    city: string;
    steps: IRouteStep[];
    createdAt: Date;
    updatedAt: Date;
}

const RouteSchema = new Schema<IRoute>(
    {
        userPreferenceId: {
            type: Schema.Types.ObjectId,
            ref: "UserPreference",
            required: true,
        },
        city: { type: String, required: true },
        steps: [
            {
                placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
                order: { type: Number, required: true },
                recommendedDurationMinutes: { type: Number, default: 60 },
            },
        ],
    },
    { timestamps: true }
);

RouteSchema.index({ userPreferenceId: 1 });

export const Route = models.Route || model<IRoute>("Route", RouteSchema);
