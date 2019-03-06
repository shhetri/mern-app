import PollModel, { Poll } from '../models/poll'

class PollRepository {
  async findAll(): Promise<Poll[]> {
    return PollModel.find()
  }

  async create(poll: Poll): Promise<Poll> {
    return PollModel.create(poll)
  }

  async findById(id: string): Promise<Poll> {
    return PollModel.findById(id).populate('user', ['_id', 'username'])
  }
}

export default PollRepository
