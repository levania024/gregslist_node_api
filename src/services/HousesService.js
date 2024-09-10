import { dbContext } from "../db/DbContext.js"

class HousesService {
    async getHouseId(houseId) {
        const house = (await dbContext.Houses.findById(houseId)).populated('creator')


        return house
    }

    async getAllHouses(query) {
        const sortBy = query.sort
        delete query.sort

        const numOfPages = parseInt(query.page) || 1
        const limitAmount = 5
        const skipAmount = (numOfPages - 1) * limitAmount
        delete query.page

        const searchBy = query.search
        delete query.search
        if (searchBy) query.description = { $regex: new RegExp(searchBy, 'ig') }

        const houses = await dbContext.Houses.find(query)
            .sort(sortBy + 'creatorId')
            .skip(skipAmount)
            .limit(limitAmount)
            .populate('creator')

        const houseCount = await dbContext.Houses.countDocuments(query)
        return {
            results: houses,
            count: houseCount,
            currentPage: numOfPages,
            totalPages: Math.ceil(houseCount / limitAmount)
        }
    }
}

export const housesService = new HousesService