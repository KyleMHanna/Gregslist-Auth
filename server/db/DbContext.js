import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { CarSchema } from '../models/Car.js'
import { HouseSchema } from '../models/House.js'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Cars = mongoose.model('Car', CarSchema);
  Houses = mongoose.model('House', HouseSchema)
}

export const dbContext = new DbContext()
