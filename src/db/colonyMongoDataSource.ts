import { Db, ObjectID } from 'mongodb'
import { MongoDataSource } from 'apollo-datasource-mongo'
import { CachedCollection } from 'apollo-datasource-mongo/dist/cache'
import { DataSource, DataSourceConfig } from 'apollo-datasource'

import {
  ColonyDoc,
  DomainDoc,
  EventDoc,
  LevelDoc,
  NotificationDoc,
  PersistentTaskDoc,
  ProgramDoc,
  ProgramSubmissionDoc,
  SubmissionDoc,
  SuggestionDoc,
  TaskDoc,
  TokenDoc,
  UserDoc,
} from './types'
import { CollectionNames } from './collections'
import {
  Colony,
  Domain,
  Event,
  Level,
  LevelStatus,
  PersistentTask,
  PersistentTaskStatus,
  Program,
  ProgramStatus,
  ProgramSubmission,
  Submission,
  SubmissionStatus,
  Suggestion,
  SuggestionStatus,
  Task,
  TokenInfo,
  User,
} from '../graphql/types'
import { ETH_ADDRESS } from '../constants'

// TODO re-enable cache
// const DEFAULT_TTL = { ttl: 10000 }
const DEFAULT_TTL = { ttl: undefined }

interface Collections {
  colonies: CachedCollection<ColonyDoc>
  domains: CachedCollection<DomainDoc>
  events: CachedCollection<EventDoc<any>>
  levels: CachedCollection<LevelDoc>
  notifications: CachedCollection<NotificationDoc>
  persistentTasks: CachedCollection<PersistentTaskDoc>
  programs: CachedCollection<ProgramDoc>
  submissions: CachedCollection<SubmissionDoc>
  suggestions: CachedCollection<SuggestionDoc>
  tasks: CachedCollection<TaskDoc>
  tokens: CachedCollection<TokenDoc>
  users: CachedCollection<UserDoc>
}

export class ColonyMongoDataSource extends MongoDataSource<Collections, {}>
  implements DataSource<any> {
  public readonly collections: Collections

  constructor(db: Db) {
    super([
      db.collection(CollectionNames.Colonies),
      db.collection(CollectionNames.Domains),
      db.collection(CollectionNames.Events),
      db.collection(CollectionNames.Levels),
      db.collection(CollectionNames.Notifications),
      db.collection(CollectionNames.PersistentTasks),
      db.collection(CollectionNames.Programs),
      db.collection(CollectionNames.Submissions),
      db.collection(CollectionNames.Suggestions),
      db.collection(CollectionNames.Tasks),
      db.collection(CollectionNames.Tokens),
      db.collection(CollectionNames.Users),
    ])
  }

  // This shouldn't be necessary, but there were problems with the GraphQL types
  initialize(config: DataSourceConfig<{}>): void {
    super.initialize(config)
  }

  // TODO consider extending API of MongoDataSource for document transformation
  // @NOTE: This is where you add resolver fields to avoid super weird TS errors
  // LOOK AT MEE I'M MR MESEEKS
  private static transformColony({
    _id,
    tokenAddresses = [],
    taskIds = [],
    ...doc
  }: ColonyDoc): Colony {
    return {
      ...doc,
      createdAt: _id.getTimestamp(),
      id: doc.colonyAddress,
      taskIds,
      tokenAddresses,
      tasks: [],
      domains: [],
      programs: [],
      subscribedUsers: [],
      suggestions: [],
    }
  }

  private static transformUser({
    _id,
    colonyAddresses = [],
    taskIds = [],
    tokenAddresses = [],
    ...profile
  }: UserDoc): User {
    return {
      id: profile.walletAddress,
      createdAt: _id.getTimestamp(),
      colonies: [],
      completedLevels: [],
      notifications: [],
      tasks: [],
      colonyAddresses,
      tokenAddresses,
      taskIds,
      profile,
    }
  }

  // Get a minimal user profile for unregistered users
  static getMinimalUser(address): User {
    return {
      id: address,
      createdAt: new Date(0),
      colonies: [],
      notifications: [],
      tasks: [],
      colonyAddresses: [],
      completedLevels: [],
      tokenAddresses: [],
      taskIds: [],
      profile: {
        walletAddress: address,
      },
    }
  }

  private static transformEvent<C extends object>({
    _id,
    context,
    type,
    ...doc
  }: EventDoc<C>): Event {
    const id = _id.toHexString()
    return {
      ...doc,
      id,
      createdAt: _id.getTimestamp(),
      sourceId: id,
      type,
      context: {
        ...context,
        type, // For the sake of discriminating the union type in gql
      },
    }
  }

  private static transformToken({ _id, ...doc }: TokenDoc): TokenInfo {
    return {
      ...doc,
      id: doc.address,
      verified: undefined,
    }
  }

  private static transformDomain({ _id, ...doc }: DomainDoc): Domain {
    return {
      ...doc,
      tasks: [],
      id: _id.toHexString(),
      createdAt: _id.getTimestamp(),
    }
  }

  private static transformSubmission({
    _id,
    persistentTaskId,
    ...doc
  }: SubmissionDoc): Submission {
    return {
      ...doc,
      id: _id.toHexString(),
      createdAt: _id.getTimestamp(),
      creator: undefined,
      persistentTaskId: persistentTaskId.toHexString(),
      task: undefined,
    }
  }

  private static transformProgramSubmission({
    _id,
    levelId,
    submission,
  }: ProgramSubmissionDoc): ProgramSubmission {
    return {
      id: _id.toHexString(),
      levelId: levelId.toHexString(),
      level: undefined,
      submission: ColonyMongoDataSource.transformSubmission(submission),
    }
  }

  private static transformProgram({ _id, ...doc }: ProgramDoc): Program {
    return {
      ...doc,
      id: _id.toHexString(),
      createdAt: _id.getTimestamp(),
      enrolled: undefined,
      levels: undefined,
      submissions: undefined,
    }
  }

  private static transformLevel({ _id, programId, ...doc }: LevelDoc): Level {
    return {
      ...doc,
      id: _id.toHexString(),
      createdAt: _id.getTimestamp(),
      programId: programId.toHexString(),
      program: undefined,
      steps: undefined,
      unlocked: undefined,
    }
  }

  private static transformSuggestion({
    _id,
    taskId,
    ...doc
  }: SuggestionDoc): Suggestion {
    return {
      ...doc,
      id: _id.toHexString(),
      createdAt: _id.getTimestamp(),
      creator: undefined,
      taskId: taskId ? taskId.toHexString() : undefined,
    }
  }

  private static transformTask({
    workInviteAddresses = [],
    workRequestAddresses = [],
    payouts = [],
    _id,
    ...doc
  }: TaskDoc): Task {
    return {
      ...doc,
      id: _id.toHexString(),
      createdAt: _id.getTimestamp(),
      events: [],
      workInvites: [],
      workRequests: [],
      colony: undefined,
      creator: undefined,
      domain: undefined,
      payouts: payouts.map((payout) => ({ ...payout, token: undefined })),
      workRequestAddresses,
      workInviteAddresses,
    }
  }

  private static transformPersistenTask({
    payouts = [],
    _id,
    ...doc
  }: PersistentTaskDoc): PersistentTask {
    return {
      ...doc,
      id: _id.toHexString(),
      createdAt: _id.getTimestamp(),
      payouts: payouts.map((payout) => ({ ...payout, token: undefined })),
      submissions: [],
      currentUserSubmission: undefined,
    }
  }

  async getColonyByAddress(colonyAddress: string, ttl?: number) {
    const query = { colonyAddress }
    const [doc] = ttl
      ? await this.collections.colonies.findManyByQuery(query, { ttl })
      : [await this.collections.colonies.collection.findOne(query)]

    if (!doc) {
      throw new Error(`Colony with address '${colonyAddress}' not found`)
    }

    return ColonyMongoDataSource.transformColony(doc)
  }

  async getColoniesByAddress(colonyAddresses: string[], ttl?: number) {
    const query = { colonyAddress: { $in: colonyAddresses } }
    const docs = ttl
      ? await this.collections.colonies.findManyByQuery(query, { ttl })
      : await this.collections.colonies.collection.find(query).toArray()
    return docs.map(ColonyMongoDataSource.transformColony)
  }

  async getTaskById(taskId: string, ttl?: number) {
    const doc = ttl
      ? await this.collections.tasks.findOneById(taskId, { ttl })
      : await this.collections.tasks.collection.findOne({
          _id: new ObjectID(taskId),
        })

    if (!doc) throw new Error(`Task with id '${taskId}' not found`)

    return ColonyMongoDataSource.transformTask(doc)
  }

  async getTaskByEthId(colonyAddress: string, ethPotId: number, ttl?: number) {
    const query = { colonyAddress, ethPotId }
    const [doc] = ttl
      ? await this.collections.tasks.findManyByQuery(query, { ttl })
      : [await this.collections.tasks.collection.findOne(query)]

    if (!doc)
      throw new Error(
        `Task with potId '${ethPotId}' for colony '${colonyAddress}' not found`,
      )

    return ColonyMongoDataSource.transformTask(doc)
  }

  async getTasksById(taskIds: string[], ttl?: number) {
    const docs = ttl
      ? await this.collections.tasks.findManyByIds(taskIds, { ttl })
      : await this.collections.tasks.collection
          .find({ _id: { $in: taskIds.map((id) => new ObjectID(id)) } })
          .toArray()

    return docs.map(ColonyMongoDataSource.transformTask)
  }

  async getTasksByEthDomainId(
    colonyAddress: string,
    ethDomainId: number,
    ttl?: number,
  ) {
    const query = { colonyAddress, ethDomainId }
    const docs = ttl
      ? await this.collections.tasks.findManyByQuery(query, { ttl })
      : await this.collections.tasks.collection.find(query).toArray()

    return docs.map(ColonyMongoDataSource.transformTask)
  }

  async getDomainByEthId(
    colonyAddress: string,
    ethDomainId: number,
    ttl?: number,
  ) {
    const query = { colonyAddress, ethDomainId }
    const [doc] = ttl
      ? await this.collections.domains.findManyByQuery(query, { ttl })
      : [await this.collections.domains.collection.findOne(query)]

    if (!doc)
      throw new Error(
        `Domain with ID '${ethDomainId}' for colony '${colonyAddress}' not found`,
      )

    return ColonyMongoDataSource.transformDomain(doc)
  }

  async getColonyDomains(colonyAddress: string, ttl?: number) {
    const query = { colonyAddress }
    const docs = ttl
      ? await this.collections.domains.findManyByQuery(query, { ttl })
      : await this.collections.domains.collection.find(query).toArray()
    return docs.map(ColonyMongoDataSource.transformDomain)
  }

  async getPersistentTaskById(id: string, ttl?: number) {
    const query = {
      _id: new ObjectID(id),
      status: { $ne: PersistentTaskStatus.Deleted },
    }
    let doc: PersistentTaskDoc
    if (ttl) {
      const docs = await this.collections.persistentTasks.findManyByQuery(
        query,
        { ttl },
      )
      doc = docs[0]
    } else {
      doc = await this.collections.persistentTasks.collection.findOne(query)
    }

    if (!doc) throw new Error(`Persistent Task with id '${id}' not found`)

    return ColonyMongoDataSource.transformPersistenTask(doc)
  }

  async getTaskSubmissions(id: string, ttl?: number) {
    const query = {
      persistentTaskId: new ObjectID(id),
      status: { $ne: SubmissionStatus.Deleted },
    }
    const docs = ttl
      ? await this.collections.submissions.findManyByQuery(query, { ttl })
      : await this.collections.submissions.collection.find(query).toArray()
    return docs.map(ColonyMongoDataSource.transformSubmission)
  }

  async getUserSubmissionForTask(
    id: string,
    creatorAddress: string,
    ttl?: number,
  ) {
    const query = { persistentTaskId: new ObjectID(id), creatorAddress }
    let doc: SubmissionDoc
    if (ttl) {
      const docs = await this.collections.submissions.findManyByQuery(query, {
        ttl,
      })
      doc = docs[0]
    } else {
      doc = await this.collections.submissions.collection.findOne(query)
    }

    if (!doc) return null
    return ColonyMongoDataSource.transformSubmission(doc)
  }

  async getProgramSubmissions(programId: string, ttl?: number) {
    const { levelIds } = await this.getProgramById(programId)
    const levelObjectIds = levelIds.map((id) => new ObjectID(id))
    const query = {
      _id: { $in: levelObjectIds },
      status: { $ne: LevelStatus.Deleted },
    }
    const docs = await this.collections.levels.collection.aggregate<
      ProgramSubmissionDoc
    >([
      // 1. Find all levels matching the above query
      { $match: query },
      // 2. Map stepId array to ObjectIds (they are stored as strings)
      {
        $project: {
          stepIds: {
            $map: {
              input: '$stepIds',
              as: 'stepStringId',
              in: { $toObjectId: '$$stepStringId' },
            },
          },
          levelId: '$_id',
        },
      },
      // 3. Look up persistent tasks for the given stepIds
      {
        $lookup: {
          from: this.collections.persistentTasks.collection.collectionName,
          localField: 'stepIds',
          foreignField: '_id',
          as: 'persistentTasks',
        },
      },
      // 4. Flatten persisten task arrays
      { $unwind: '$persistentTasks' },
      // 5. Do some projections to store variables
      {
        $project: {
          levelId: 1,
          persistentTaskId: '$persistentTasks._id',
        },
      },
      // 6. Look up all submissions for the given persistent tasks
      {
        $lookup: {
          from: this.collections.submissions.collection.collectionName,
          let: { persistentTaskId: '$persistentTaskId', levelId: '$levelId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$persistentTaskId', '$$persistentTaskId'] },
                    { $eq: ['$status', SubmissionStatus.Open] },
                  ],
                },
              },
            },
          ],
          as: 'submissions',
        },
      },
      // 7. Flatten all submissions arrays
      { $unwind: '$submissions' },
      // 8. Project to the final document shape
      {
        $project: {
          _id: '$submissions._id',
          levelId: 1,
          submission: '$submissions',
        },
      },
    ])
    const submissions = await docs.toArray()
    return submissions.map(ColonyMongoDataSource.transformProgramSubmission)
  }

  async getSubmissionById(id: string, ttl?: number) {
    const query = {
      _id: new ObjectID(id),
      status: { $ne: SubmissionStatus.Deleted },
    }
    let doc: SubmissionDoc
    if (ttl) {
      const docs = await this.collections.submissions.findManyByQuery(query, {
        ttl,
      })
      doc = docs[0]
    } else {
      doc = await this.collections.submissions.collection.findOne(query)
    }

    if (!doc) throw new Error(`Submission with id '${id}' not found`)

    return ColonyMongoDataSource.transformSubmission(doc)
  }

  async getProgramById(id: string, ttl?: number) {
    const query = {
      _id: new ObjectID(id),
      status: { $ne: ProgramStatus.Deleted },
    }
    let doc: ProgramDoc
    if (ttl) {
      const docs = await this.collections.programs.findManyByQuery(query, {
        ttl,
      })
      doc = docs[0]
    } else {
      doc = await this.collections.programs.collection.findOne(query)
    }

    if (!doc) throw new Error(`Program with id '${id}' not found`)

    return ColonyMongoDataSource.transformProgram(doc)
  }

  async getColonyPrograms(colonyAddress: string, ttl?: number) {
    const query = { colonyAddress, status: { $ne: ProgramStatus.Deleted } }
    const docs = ttl
      ? await this.collections.programs.findManyByQuery(query, { ttl })
      : await this.collections.programs.collection.find(query).toArray()
    return docs.map(ColonyMongoDataSource.transformProgram)
  }

  async getLevelById(id: string, ttl?: number) {
    const query = {
      _id: new ObjectID(id),
      status: { $ne: LevelStatus.Deleted },
    }
    let doc: LevelDoc
    if (ttl) {
      const docs = await this.collections.levels.findManyByQuery(query, { ttl })
      doc = docs[0]
    } else {
      doc = await this.collections.levels.collection.findOne(query)
    }

    if (!doc) throw new Error(`Level with id '${id}' not found`)

    return ColonyMongoDataSource.transformLevel(doc)
  }

  async getLevelsById(ids: string[], ttl?: number) {
    const levelObjectIds = ids.map((id) => new ObjectID(id))
    const query = {
      _id: { $in: levelObjectIds },
      status: { $ne: LevelStatus.Deleted },
    }
    const docs = ttl
      ? await this.collections.levels.findManyByQuery(query, { ttl })
      : await this.collections.levels.collection.find(query).toArray()
    return docs.map(ColonyMongoDataSource.transformLevel)
  }

  async getLevelTasks(levelId: string, ttl?: number) {
    const { stepIds } = await this.getLevelById(levelId)
    const stepObjectIds = stepIds.map((id) => new ObjectID(id))
    const query = {
      _id: { $in: stepObjectIds },
      status: { $ne: PersistentTaskStatus.Deleted },
    }
    const docs = ttl
      ? await this.collections.persistentTasks.findManyByQuery(query, { ttl })
      : await this.collections.persistentTasks.collection.find(query).toArray()
    return docs.map(ColonyMongoDataSource.transformPersistenTask)
  }

  // Users can always submit in levels they already have completed plus in the upcoming level
  async getSubmissibleLevels(
    userAddress: string,
    programId: string,
    ttl?: number,
  ) {
    const levelQuery = {
      completedBy: userAddress,
      programId: new ObjectID(programId),
      status: { $ne: LevelStatus.Deleted },
    }
    const { levelIds, enrolledUserAddresses } = await this.getProgramById(
      programId,
      ttl,
    )
    if (!enrolledUserAddresses.includes(userAddress)) {
      return []
    }
    const completedLevelObjectIds = await this.collections.levels.collection.distinct(
      '_id',
      levelQuery,
    )
    const completedLevelIds = completedLevelObjectIds.map((id) => id.toString())
    const [nextLevelId] = levelIds.filter(
      (levelId) => !completedLevelIds.includes(levelId),
    )
    return [...completedLevelIds, nextLevelId]
  }

  async getSuggestionById(id: string, ttl?: number) {
    const doc = ttl
      ? await this.collections.suggestions.findOneById(id, { ttl })
      : await this.collections.suggestions.collection.findOne({
          _id: new ObjectID(id),
        })

    if (!doc) throw new Error(`Suggestion with id '${id}' not found`)

    return ColonyMongoDataSource.transformSuggestion(doc)
  }

  async getColonySuggestions(colonyAddress: string, ttl?: number) {
    const query = { colonyAddress, status: { $ne: SuggestionStatus.Deleted } }
    const docs = ttl
      ? await this.collections.suggestions.findManyByQuery(query, { ttl })
      : await this.collections.suggestions.collection.find(query).toArray()
    return docs.map(ColonyMongoDataSource.transformSuggestion)
  }

  async getUserByAddress(walletAddress: string, ttl?: number) {
    const query = { walletAddress }
    const [doc] = ttl
      ? await this.collections.users.findManyByQuery(query, { ttl })
      : [await this.collections.users.collection.findOne(query)]

    if (!doc) throw new Error(`User with address '${walletAddress}' not found`)

    return ColonyMongoDataSource.transformUser(doc)
  }

  async getUsersByAddress(walletAddresses: string[], ttl?: number) {
    const query = { walletAddress: { $in: walletAddresses } }
    const docs = ttl
      ? await this.collections.users.findManyByQuery(query, { ttl })
      : await this.collections.users.collection.find(query).toArray()
    return docs.map(ColonyMongoDataSource.transformUser)
  }

  async getColonySubscribedUsers(colonyAddress: string, ttl?: number) {
    const query = { colonyAddresses: colonyAddress }
    const docs = ttl
      ? await this.collections.users.findManyByQuery(query, { ttl })
      : await this.collections.users.collection.find(query).toArray()
    return docs.map(ColonyMongoDataSource.transformUser)
  }

  private async getUserNotifications(address: string, query: object) {
    const docs = ((await this.collections.notifications.collection
      .aggregate([
        { $match: query },
        { $sort: { _id: -1 } },
        { $unwind: '$users' },
        { $match: { 'users.address': address } },
        {
          $lookup: {
            from: this.collections.events.collection.collectionName,
            localField: 'eventId',
            foreignField: '_id',
            as: 'events',
          },
        },
        {
          $project: {
            _id: '$_id',
            event: { $arrayElemAt: ['$events', 0] },
            read: { $ifNull: ['$users.read', false] },
          },
        },
      ])
      .toArray()) as unknown) as {
      _id: ObjectID
      read: boolean
      event: EventDoc<any>
    }[]
    return docs.map(({ event, read, _id }) => ({
      id: _id.toHexString(),
      read,
      event: ColonyMongoDataSource.transformEvent(event),
    }))
  }

  async getAllUserNotifications(address: string) {
    return this.getUserNotifications(address, {
      'users.address': address,
    })
  }

  async getReadUserNotifications(address: string) {
    return this.getUserNotifications(address, {
      users: { address, read: true },
    })
  }

  async getUnreadUserNotifications(address: string) {
    return this.getUserNotifications(address, {
      users: { address, read: false },
    })
  }

  async getUserCompletedLevels(address: string, colonyAddress: string) {
    const query = { completedBy: address, status: { $ne: LevelStatus.Deleted } }
    const cursor = await this.collections.levels.collection.aggregate([
      // 1. Find all levels matching the above query
      { $match: query },
      // 2. Look up the corresponding program
      {
        $lookup: {
          from: this.collections.programs.collection.collectionName,
          localField: 'programId',
          foreignField: '_id',
          as: 'program',
        },
      },
      // 3. Filter the results by the given colonyAddress
      { $match: { 'program.colonyAddress': colonyAddress } },
      // 4. Remove the program field to get the levels as we know and like them
      { $unset: 'program' },
    ])
    const levels = await cursor.toArray()
    return levels.map(ColonyMongoDataSource.transformLevel)
  }

  async getTaskEvents(taskId: string, ttl?: number) {
    const query = { 'context.taskId': taskId }
    const events = ttl
      ? await this.collections.events.findManyByQuery(query, { ttl })
      : await this.collections.events.collection.find(query).toArray()
    return events.map(ColonyMongoDataSource.transformEvent)
  }

  async getTokenByAddress(tokenAddress: string, ttl?: number) {
    const query = { address: tokenAddress }
    const [token] = ttl
      ? await this.collections.tokens.findManyByQuery(query, { ttl })
      : [await this.collections.tokens.collection.findOne(query)]

    if (!token) {
      throw new Error(`Token with address '${tokenAddress}' not found`)
    }

    return ColonyMongoDataSource.transformToken(token)
  }
}
