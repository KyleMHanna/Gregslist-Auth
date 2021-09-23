import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    Rate: { type: Number, min: 0 },
    JobTitle: { type: String, min: 0 },
    Company: { type: String, min: 0 },
    Hours: { type: Number, min: 0 },
    description: { type: String },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }

)
JobSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
