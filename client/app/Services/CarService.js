import { ProxyState } from '../AppState.js'
import { Car } from '../Models/Car.js'
import { api } from '../Services/AxiosService.js'

class CarsService {
  async deleteCar(carId) {
    await api.delete(carId)
    ProxyState.cars = ProxyState.cars.filter(c => c.id !== carId)
  }

  async addCar(carData) {
    const res = await api.post('', carData)
    ProxyState.cars = [...ProxyState.cars, new Car(res.data)]
  }

  async getCars() {
    const response = await api.get()
    ProxyState.cars = response.data.map(c => new Car(c))
  }
}

// singleton pattern
export const carsService = new CarsService()
