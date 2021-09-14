import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class JobsService {
  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId).populate('creator', 'name picture')
    if (!job) {
      throw new BadRequest('Invalid house Id')
    }
    return job
  }

  async editJob(jobId, userId, jobData) {
    const job = await this.getJobById(jobId)
    if (userId !== job.creatorId.toString()) {
      throw new Forbidden('You did not make this job')
    }
    job.description = jobData.description || job.description
    job.Rate = jobData.Rate || job.Rate
    job.JobTitle = jobData.JobTitle || job.JobTitle
    job.Company = jobData.Company || job.Company
    job.Hours = jobData.Hours || job.Hours

    await job.save()
    return job
  }

  async removeJob(jobId, userId) {
    const job = await this.getJobById(jobId)
    if (userId !== job.creatorId.toString()) {
      throw new Forbidden('You did not make this job')
    }
    await job.remove()
    return job
  }

  async createJob(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }

  async getJobs(query) {
    const jobs = await dbContext.Jobs.find(query).populate('creator', 'name picture')
    return jobs
  }
}
export const jobsService = new JobsService()
