import { Schema } from "mongoose";

export const HouseSchema = new Schema(
    {
        bedrooms: { type: Number, min: 0, max: 30, require: true },
        bathrooms: { type: Number, min: 0, max: 25, require: true },
        level: { type: Number, min: 1, max: 4, require: true },
        price: { type: Number, min: 0, max: 10000000, require: true },
        imgUrl: { type: String, minlength: 0, maxlength: 500, require: true },
        description: { type: String, minlength: 0, maxlength: 500, require: false },
        year: { type: Number, min: 1000, max: 2024, require: true },
        creatorId: { type: Schema.ObjectId, require: true, ref: 'Account' }
    },

    {
        timestamps: true,
        toJSON: { victuals: true }
    }
)

HouseSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})