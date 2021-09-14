import { ProxyState } from '../AppState.js'
import { House } from '../Models/House.js'
import { api } from '../Services/AxiosService.js'

class HouseService {
  async deleteHouse(houseId) {
    await api.delete(houseId)
    ProxyState.houses = ProxyState.house.filter(h => h.id !== houseId)
  }

  async addHouse(houseData) {
    const res = await api.post('', houseData)
    ProxyState.houses = [...ProxyState.houses, new House(res.data)]
  }

  async getHouses() {
    const response = await api.get()
    ProxyState.houses = response.data.map(h => new House(h))
  }
}

export const houseService = new HouseService()
