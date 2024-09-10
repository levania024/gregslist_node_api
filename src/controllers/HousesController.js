import BaseController from "../utils/BaseController.js";
import { housesService } from "../services/HousesService.js";

export class HousesController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getAllHouses)
            .get('/:houseId', this.getHouseId)
    }

    async getAllHouses(request, response, next) {
        try {
            const query = request.query
            const houses = await housesService.getAllHouses(query)
            response.send(houses)
        } catch (error) {
            next(error)
        }
    }

    async getHouseId(request, response, next) {
        try {
            const houseId = request.params.houseId
            const house = await housesService.getHouseId(houseId)
            response.send(house)
        } catch (error) {
            next(error)
        }
    }
}