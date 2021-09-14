import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class HousesService {
  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('creator', 'name picture')
    if (!house) {
      throw new BadRequest('Invalid house Id')
    }
    return house
  }

  async editHouse(houseId, userId, houseData) {
    const house = await this.getHouseById(houseId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('You did not make this house')
    }
    house.description = houseData.description || house.description
    house.price = houseData.price || house.price
    house.Bedrooms = houseData.Bedrooms || house.Bedrooms
    house.Bathrooms = houseData.Bathrooms || house.Bathrooms
    house.Sqft = houseData.Sqft || house.Sqft
    house.img = houseData.img || house.img
    await house.save()
    return house
  }

  async removeHouse(houseId, userId) {
    const house = await this.getHouseById(houseId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('You did not make this house')
    }
    await house.remove()
    return house
  }

  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }

  async getHouses(query) {
    const houses = await dbContext.Houses.find(query).populate('creator', 'name picture')
    return houses
  }
}

export const housesService = new HousesService()
