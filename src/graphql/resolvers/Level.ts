import { ApolloContext } from '../apolloTypes'
import { LevelResolvers } from '../types'

export const Level: LevelResolvers<ApolloContext> = {
  async steps({ id }, input, { dataSources: { data } }) {
    return data.getLevelTasks(id)
  },
  async unlocked(
    { id, programId },
    input,
    { dataSources: { data }, userAddress },
  ) {
    const submissibleLevels = await data.getSubmissibleLevels(userAddress, programId)
    return submissibleLevels.includes(id)
  },
}
