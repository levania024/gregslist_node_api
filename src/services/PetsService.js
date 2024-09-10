import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class PetsService {
    async getPetsId(petId) {
        const pet = await dbContext.Pets.findById(petId).populate('creator')

        if (pet == null) {
            throw new BadRequest(`No car found with the id of ${petId}`)
        }
        return pet
    }

    async getAllPet(query) {
        const sortBy = query.sort
        delete query.sort

        const numOfPages = parseInt(query.page) || 1
        const limitAmount = 5
        const skipAmount = (numOfPages - 1) * limitAmount
        delete query.page

        const searchBy = query.search
        delete query.search
        if (searchBy) query.description = { $regex: new RegExp(searchBy, 'ig') }

        const pets = await dbContext.Pets.find(query)
            .sort(sortBy + 'age')
            .skip(skipAmount)
            .limit(limitAmount)
            .populate('creator')

        const petCount = await dbContext.Pets.countDocuments(query)
        return {
            results: pets,
            count: petCount,
            currentPage: numOfPages,
            totalPages: Math.ceil(petCount / limitAmount)
        }
    }
}

export const petsService = new PetsService()