import PollModel, { Poll } from '../models/poll'

class PollRepository {
  async create(poll: Poll): Promise<Poll> {
    return PollModel.create(poll)
  }
}

export default PollRepository
