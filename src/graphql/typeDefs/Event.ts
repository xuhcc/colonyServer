import { gql } from 'apollo-server-express'

export default gql`
  interface TaskEvent {
    type: EventType!
    taskId: String!
    colonyAddress: String
  }

  interface ColonyEvent {
    type: EventType!
    colonyAddress: String
  }

  type AssignWorkerEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    workerAddress: String!
    colonyAddress: String
  }

  type UnassignWorkerEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    workerAddress: String!
    colonyAddress: String
  }

  type CancelTaskEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    colonyAddress: String
  }

  type CreateDomainEvent implements ColonyEvent {
    type: EventType!
    ethDomainId: Int!
    colonyAddress: String
  }

  type CreateTaskEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    ethDomainId: Int!
    colonyAddress: String
  }

  type CreateWorkRequestEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    colonyAddress: String
  }

  type FinalizeTaskEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    colonyAddress: String
  }

  type SetTaskPendingEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    txHash: String!
    colonyAddress: String
  }

  type RemoveTaskPayoutEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    tokenAddress: String!
    amount: String!
    colonyAddress: String
  }

  type SendWorkInviteEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    workerAddress: String!
    colonyAddress: String
  }

  type SetTaskDescriptionEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    description: String!
    colonyAddress: String
  }

  type SetTaskDomainEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    ethDomainId: Int!
    colonyAddress: String
  }

  type SetTaskDueDateEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    dueDate: GraphQLDateTime
    colonyAddress: String
  }

  type SetTaskPayoutEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    tokenAddress: String!
    amount: String!
    colonyAddress: String
  }

  type SetTaskSkillEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    ethSkillId: Int!
    colonyAddress: String
  }

  type RemoveTaskSkillEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    ethSkillId: Int!
    colonyAddress: String
  }

  type SetTaskTitleEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    title: String!
    colonyAddress: String
  }

  type TaskMessageEvent implements TaskEvent {
    type: EventType!
    taskId: String!
    message: String!
    colonyAddress: String
  }

  type NewUserEvent {
    type: EventType!
  }

  type AcceptLevelTaskSubmissionEvent {
    type: EventType!
    acceptedBy: String!
    levelId: String!
    payouts: [TaskPayout!]!
    persistentTaskId: String!
    programId: String!
    submissionId: String!
  }

  type CreateLevelTaskSubmissionEvent {
    type: EventType!
    programId: String!
    persistentTaskId: String!
    levelId: String!
    submissionId: String!
  }

  type EnrollUserInProgramEvent {
    type: EventType!
    programId: String!
  }

  type UnlockNextLevelEvent {
    type: EventType!
    levelId: String!
    nextLevelId: String
    persistentTaskId: String!
    programId: String!
    submissionId: String!
  }

  union EventContext =
      AcceptLevelTaskSubmissionEvent
    | AssignWorkerEvent
    | CancelTaskEvent
    | CreateDomainEvent
    | CreateTaskEvent
    | CreateLevelTaskSubmissionEvent
    | CreateWorkRequestEvent
    | EnrollUserInProgramEvent
    | FinalizeTaskEvent
    | NewUserEvent
    | RemoveTaskPayoutEvent
    | SendWorkInviteEvent
    | SetTaskDescriptionEvent
    | SetTaskDomainEvent
    | SetTaskDueDateEvent
    | SetTaskPayoutEvent
    | SetTaskPendingEvent
    | SetTaskSkillEvent
    | RemoveTaskSkillEvent
    | SetTaskTitleEvent
    | TaskMessageEvent
    | UnassignWorkerEvent
    | UnlockNextLevelEvent

  type Event {
    id: String!
    type: EventType!
    createdAt: GraphQLDateTime!
    initiator: User
    initiatorAddress: String!
    sourceId: String!
    sourceType: String!
    context: EventContext!
  }

  type Notification {
    id: String!
    event: Event!
    read: Boolean!
  }
`
