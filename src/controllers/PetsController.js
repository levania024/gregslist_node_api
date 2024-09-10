import BaseController from "../utils/BaseController.js";
import { petsService } from "../services/PetsService.js";

export class PetsController extends BaseController {
    constructor() {
        super('api/pets')
        this.router
            .get('', this.getAllPet)
            .get('/:petId', this.getPetsId)
    }

    async getPetsId(request, response, next) {
        try {
            const petId = request.params.petId
            const pet = await petsService.getPetsId(petId)
            response.send(pet)
        } catch (error) {
            next(error)
        }
    }

    async getAllPet(request, response, next) {
        try {
            const query = request.query
            const pets = await petsService.getAllPet(query)
            response.send(pets)
        } catch (error) {
            next(error)
        }
    }

}