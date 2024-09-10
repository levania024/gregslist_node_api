import mongoose, { mongo } from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CarSchema } from '../models/Car.js';
import { HouseSchema } from '../models/House.js';
import { PetSchema } from '../models/Pet.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Cars = mongoose.model('Car', CarSchema)
  Houses = mongoose.model('House', HouseSchema)
  Pets = mongoose.model('Pet', PetSchema)
}

export const dbContext = new DbContext()
