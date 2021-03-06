import { ApolloContext } from '../apolloTypes'
import { TaskResolvers, TaskPayoutResolvers } from '../types'
import { ColonyMongoDataSource } from '../../db/colonyMongoDataSource'

export const Task: TaskResolvers<ApolloContext> = {
  async colony({ colonyAddress }, input, { dataSources: { data } }) {
    return data.getColonyByAddress(colonyAddress)
  },
  async creator({ creatorAddress }, input, { dataSources: { data } }) {
    return data.getUserByAddress(creatorAddress)
  },
  async domain(
    { colonyAddress, ethDomainId },
    input,
    { dataSources: { data } },
  ) {
    return data.getDomainByEthId(colonyAddress, ethDomainId)
  },
  async assignedWorker(
    { assignedWorkerAddress },
    input,
    { dataSources: { data } },
  ) {
    if (assignedWorkerAddress) {
      try {
        return await data.getUserByAddress(assignedWorkerAddress)
      } catch (err) {
        return ColonyMongoDataSource.getMinimalUser(assignedWorkerAddress)
      }
    }
    return null
  },
  async workInvites({ workInviteAddresses }, input, { dataSources: { data } }) {
    return data.getUsersByAddress(workInviteAddresses)
  },
  async workRequests(
    { workRequestAddresses },
    input,
    { dataSources: { data } },
  ) {
    return data.getUsersByAddress(workRequestAddresses)
  },
  async events({ id }, input, { dataSources: { data } }) {
    return data.getTaskEvents(id)
  },
}
