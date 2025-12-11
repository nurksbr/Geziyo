import { Schema, model, models, Document, Types } from "mongoose";

export interface IReview extends Document {
    placeId: Types.ObjectId;
    userName: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
    {
        placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
        userName: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String },
    },
    { timestamps: true }
);

ReviewSchema.index({ placeId: 1 });

export const Review = models.Review || model<IReview>("Review", ReviewSchema);
