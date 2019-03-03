import PollRepository from '../respositories/poll-repository'
import { Poll, Option } from '../models/poll'
import { User } from '../models/user'

class PollService {
  private readonly pollRepository: PollRepository = new PollRepository()

  async create(
    input: { question: string; options: string[] },
    user: User
  ): Promise<Poll> {
    const poll = {
      user,
      question: input.question,
      options: input.options.map((option: string) => ({
        name: option,
        votes: 0,
      })) as Option[],
    }

    return this.pollRepository.create(poll as Poll)
  }
}

export default PollService
