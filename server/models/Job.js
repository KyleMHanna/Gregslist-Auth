import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    Rate: { type: Number, required: true, min: 0 },
    JobTitle: { type: String, required: true, min: 0 },
    Company: { type: String, required: true, min: 0 },
    Hours: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }

)
JobSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
