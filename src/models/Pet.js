import { Schema } from "mongoose"

export const PetSchema = new Schema(
    {
        name: { type: Number, min: 1, max: 100, require: true },
        age: { type: Number, min: 0, max: 5000, require: true },
        imgUrl: { type: String, minlength: 1, maxlength: 1000, require: true },
        like: [{ type: String, maxlength: 50, require: false }],
        status: { type: String, enum: ['adopted', 'adoptable'], require: false },
        species: { type: String, enum: ['cat', 'dog', 'bird', 'capybara'], require: false },
        isVaccinated: { type: Boolean, require: true },
        creatorId: { type: Schema.ObjectId, require: true, ref: 'Account' }
    },

    {
        timestamps: true,
        toJSON: { victuals: true }
    }
)

PetSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})