import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema(
  {
    price: { type: Number, required: false, min: 0 },
    img: { type: String, default: 'https://media.istockphoto.com/vectors/abandoned-house-spooky-place-dilapidated-building-error-404-page-not-vector-id816802498?k=20&m=816802498&s=170667a&w=0&h=mlsU4UYqxRrWiEomEMZYKsjOsD8_0sKnWDW3bROe6fM=' },
    year: { type: Number, min: 1900, max: 3000 },
    description: { type: String, required: false },
    Sqft: { type: Number, required: false, min: 0 },
    Bedrooms: { type: Number, required: false, min: 0 },
    Bathrooms: { type: Number, required: false, min: 0 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }

)
HouseSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
