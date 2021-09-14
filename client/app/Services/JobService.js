import { ProxyState } from '../AppState.js'
import { Job } from '../Models/Job.js'
import { api } from '../Services/AxiosService.js'

class JobService {
  async deleteJob(jobId) {
    await api.delete(jobId)
    ProxyState.jobs = ProxyState.jobs.filter(j => j.id !== jobId)
  }

  async addJob(jobData) {
    const res = await api.post('', jobData)
    ProxyState.jobs = [...ProxyState.jobs, new Job(res.data)]
  }

  async getJobs() {
    const response = await api.get()
    ProxyState.jobs = response.data.map(j => new Job(j))
  }
}

export const jobService = new JobService()
