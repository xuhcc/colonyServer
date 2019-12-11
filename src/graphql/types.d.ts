import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  GraphQLDateTime: any,
};

export type AddColonyTokenReferenceInput = {
  tokenAddress: Scalars['String'],
  colonyAddress: Scalars['String'],
  isExternal: Scalars['Boolean'],
  iconHash?: Maybe<Scalars['String']>,
};

export type AddUserTokenReferenceInput = {
  tokenAddress: Scalars['String'],
  iconHash?: Maybe<Scalars['String']>,
};

export type AssignWorkerEvent = TaskEvent & {
   __typename?: 'AssignWorkerEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  workerAddress: Scalars['String'],
};

export type AssignWorkerInput = {
  id: Scalars['String'],
  workerAddress: Scalars['String'],
};

export type CancelTaskEvent = TaskEvent & {
   __typename?: 'CancelTaskEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
};

export type Colony = {
   __typename?: 'Colony',
  id: Scalars['String'],
  createdAt: Scalars['GraphQLDateTime'],
  colonyAddress: Scalars['String'],
  founderAddress: Scalars['String'],
  colonyName: Scalars['String'],
  avatarHash?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  guideline?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
  taskIds: Array<Scalars['String']>,
  tasks: Array<Task>,
  domains: Array<Domain>,
  founder?: Maybe<User>,
  subscribedUsers: Array<User>,
  tokens: Array<ColonyToken>,
  tokenRefs: Array<ColonyTokenRef>,
};

export type ColonyEvent = {
  type: Scalars['String'],
  colonyAddress: Scalars['String'],
};

export type ColonyToken = IToken & {
   __typename?: 'ColonyToken',
  id: Scalars['String'],
  createdAt: Scalars['GraphQLDateTime'],
  address: Scalars['String'],
  name: Scalars['String'],
  symbol: Scalars['String'],
  iconHash?: Maybe<Scalars['String']>,
  isExternal: Scalars['Boolean'],
  isNative: Scalars['Boolean'],
};

export type ColonyTokenRef = {
   __typename?: 'ColonyTokenRef',
  address: Scalars['String'],
  isExternal?: Maybe<Scalars['Boolean']>,
  isNative?: Maybe<Scalars['Boolean']>,
  iconHash?: Maybe<Scalars['String']>,
};

export type CreateColonyInput = {
  colonyAddress: Scalars['String'],
  colonyName: Scalars['String'],
  displayName: Scalars['String'],
  tokenAddress: Scalars['String'],
  tokenName: Scalars['String'],
  tokenSymbol: Scalars['String'],
  tokenDecimals: Scalars['Int'],
  tokenIconHash?: Maybe<Scalars['String']>,
};

export type CreateDomainEvent = ColonyEvent & {
   __typename?: 'CreateDomainEvent',
  type: Scalars['String'],
  ethDomainId: Scalars['String'],
  colonyAddress: Scalars['String'],
};

export type CreateDomainInput = {
  colonyAddress: Scalars['String'],
  ethDomainId: Scalars['Int'],
  ethParentDomainId?: Maybe<Scalars['Int']>,
  name: Scalars['String'],
};

export type CreateTaskEvent = TaskEvent & {
   __typename?: 'CreateTaskEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  ethDomainId: Scalars['String'],
  colonyAddress: Scalars['String'],
};

export type CreateTaskInput = {
  colonyAddress: Scalars['String'],
  ethDomainId: Scalars['Int'],
};

export type CreateTokenInput = {
  address: Scalars['String'],
  decimals: Scalars['Int'],
  name: Scalars['String'],
  symbol: Scalars['String'],
  iconHash?: Maybe<Scalars['String']>,
};

export type CreateUserInput = {
  username: Scalars['String'],
};

export type CreateWorkRequestEvent = TaskEvent & {
   __typename?: 'CreateWorkRequestEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
};

export type CreateWorkRequestInput = {
  id: Scalars['String'],
};

export type Domain = {
   __typename?: 'Domain',
  id: Scalars['String'],
  createdAt: Scalars['GraphQLDateTime'],
  colonyAddress: Scalars['String'],
  ethDomainId: Scalars['Int'],
  ethParentDomainId?: Maybe<Scalars['Int']>,
  name: Scalars['String'],
  colony?: Maybe<Colony>,
  parent?: Maybe<Domain>,
  tasks: Array<Task>,
};

export type EditColonyProfileInput = {
  colonyAddress: Scalars['String'],
  avatarHash?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  guideline?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
};

export type EditDomainNameInput = {
  colonyAddress: Scalars['String'],
  ethDomainId: Scalars['Int'],
  name: Scalars['String'],
};

export type EditUserInput = {
  avatarHash?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
};

export type Event = {
   __typename?: 'Event',
  type: Scalars['String'],
  createdAt: Scalars['GraphQLDateTime'],
  initiator?: Maybe<User>,
  initiatorAddress: Scalars['String'],
  sourceId: Scalars['String'],
  sourceType: Scalars['String'],
  context: EventContext,
};

export type EventContext = AssignWorkerEvent | CancelTaskEvent | CreateDomainEvent | CreateTaskEvent | CreateWorkRequestEvent | FinalizeTaskEvent | RemoveTaskPayoutEvent | SendWorkInviteEvent | SetTaskDescriptionEvent | SetTaskDomainEvent | SetTaskDueDateEvent | SetTaskPayoutEvent | SetTaskSkillEvent | SetTaskTitleEvent | TaskMessageEvent | UnassignWorkerEvent;

export type FinalizeTaskEvent = TaskEvent & {
   __typename?: 'FinalizeTaskEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
};


export type IToken = {
  id: Scalars['String'],
  createdAt: Scalars['GraphQLDateTime'],
  address: Scalars['String'],
  name: Scalars['String'],
  symbol: Scalars['String'],
  iconHash?: Maybe<Scalars['String']>,
};

export type MarkNotificationAsReadInput = {
  id: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  /** Users */
  createUser?: Maybe<User>,
  editUser?: Maybe<User>,
  subscribeToColony?: Maybe<User>,
  unsubscribeFromColony?: Maybe<User>,
  /**  Colonies */
  createColony?: Maybe<Colony>,
  editColonyProfile?: Maybe<Colony>,
  /** Domains */
  createDomain?: Maybe<Domain>,
  editDomainName?: Maybe<Domain>,
  /** Tasks */
  assignWorker?: Maybe<Task>,
  cancelTask?: Maybe<Task>,
  createTask?: Maybe<Task>,
  createWorkRequest?: Maybe<Task>,
  finalizeTask?: Maybe<Task>,
  removeTaskPayout?: Maybe<Task>,
  sendWorkInvite?: Maybe<Task>,
  setTaskDomain?: Maybe<Task>,
  setTaskDescription?: Maybe<Task>,
  setTaskDueDate?: Maybe<Task>,
  setTaskPayout?: Maybe<Task>,
  setTaskSkill?: Maybe<Task>,
  setTaskTitle?: Maybe<Task>,
  unassignWorker?: Maybe<Task>,
  /** Tokens */
  createToken?: Maybe<Token>,
  addColonyTokenReference?: Maybe<Token>,
  addUserTokenReference?: Maybe<Token>,
  setColonyTokenAvatar?: Maybe<Token>,
  setUserTokenAvatar?: Maybe<Token>,
  /** Notifications */
  markAllNotificationsAsRead: Scalars['Boolean'],
  markNotificationAsRead: Scalars['Boolean'],
  /**  Messages */
  sendTaskMessage: Scalars['Boolean'],
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationEditUserArgs = {
  input: EditUserInput
};


export type MutationSubscribeToColonyArgs = {
  input: SubscribeToColonyInput
};


export type MutationUnsubscribeFromColonyArgs = {
  input: UnsubscribeFromColonyInput
};


export type MutationCreateColonyArgs = {
  input: CreateColonyInput
};


export type MutationEditColonyProfileArgs = {
  input: EditColonyProfileInput
};


export type MutationCreateDomainArgs = {
  input: CreateDomainInput
};


export type MutationEditDomainNameArgs = {
  input: EditDomainNameInput
};


export type MutationAssignWorkerArgs = {
  input: AssignWorkerInput
};


export type MutationCancelTaskArgs = {
  input: TaskIdInput
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput
};


export type MutationCreateWorkRequestArgs = {
  input: CreateWorkRequestInput
};


export type MutationFinalizeTaskArgs = {
  input: TaskIdInput
};


export type MutationRemoveTaskPayoutArgs = {
  input: RemoveTaskPayoutInput
};


export type MutationSendWorkInviteArgs = {
  input: SendWorkInviteInput
};


export type MutationSetTaskDomainArgs = {
  input: SetTaskDomainInput
};


export type MutationSetTaskDescriptionArgs = {
  input: SetTaskDescriptionInput
};


export type MutationSetTaskDueDateArgs = {
  input: SetTaskDueDateInput
};


export type MutationSetTaskPayoutArgs = {
  input: SetTaskPayoutInput
};


export type MutationSetTaskSkillArgs = {
  input: SetTaskSkillInput
};


export type MutationSetTaskTitleArgs = {
  input: SetTaskTitleInput
};


export type MutationUnassignWorkerArgs = {
  input: UnassignWorkerInput
};


export type MutationCreateTokenArgs = {
  input: CreateTokenInput
};


export type MutationAddColonyTokenReferenceArgs = {
  input: AddColonyTokenReferenceInput
};


export type MutationAddUserTokenReferenceArgs = {
  input: AddUserTokenReferenceInput
};


export type MutationSetColonyTokenAvatarArgs = {
  input: SetColonyTokenAvatarInput
};


export type MutationSetUserTokenAvatarArgs = {
  input: SetUserTokenAvatarInput
};


export type MutationMarkNotificationAsReadArgs = {
  input: MarkNotificationAsReadInput
};


export type MutationSendTaskMessageArgs = {
  input: SendTaskMessageInput
};

export type Notification = {
   __typename?: 'Notification',
  event: Event,
  read: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  user: User,
  colony: Colony,
  domain: Domain,
  task: Task,
  token: Token,
};


export type QueryUserArgs = {
  address: Scalars['String']
};


export type QueryColonyArgs = {
  address: Scalars['String']
};


export type QueryDomainArgs = {
  colonyAddress: Scalars['String'],
  ethDomainId: Scalars['Int']
};


export type QueryTaskArgs = {
  id: Scalars['String']
};


export type QueryTokenArgs = {
  address: Scalars['String']
};

export type RemoveTaskPayoutEvent = TaskEvent & {
   __typename?: 'RemoveTaskPayoutEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  tokenAddress: Scalars['String'],
  amount: Scalars['String'],
};

export type RemoveTaskPayoutInput = {
  id: Scalars['String'],
  amount: Scalars['String'],
  token: Scalars['String'],
  tokenAddress: Scalars['String'],
  ethDomainId: Scalars['Int'],
};

export type SendTaskMessageInput = {
  id: Scalars['String'],
  message: Scalars['String'],
};

export type SendWorkInviteEvent = TaskEvent & {
   __typename?: 'SendWorkInviteEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  tokenAddress: Scalars['String'],
  amount: Scalars['String'],
};

export type SendWorkInviteInput = {
  id: Scalars['String'],
  workerAddress: Scalars['String'],
};

export type SetColonyTokenAvatarInput = {
  tokenAddress: Scalars['String'],
  colonyAddress: Scalars['String'],
  iconHash?: Maybe<Scalars['String']>,
};

export type SetTaskDescriptionEvent = TaskEvent & {
   __typename?: 'SetTaskDescriptionEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  description: Scalars['String'],
};

export type SetTaskDescriptionInput = {
  id: Scalars['String'],
  description: Scalars['String'],
};

export type SetTaskDomainEvent = TaskEvent & {
   __typename?: 'SetTaskDomainEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  ethDomainId: Scalars['String'],
};

export type SetTaskDomainInput = {
  id: Scalars['String'],
  ethDomainId: Scalars['Int'],
};

export type SetTaskDueDateEvent = TaskEvent & {
   __typename?: 'SetTaskDueDateEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  dueDate: Scalars['Int'],
};

export type SetTaskDueDateInput = {
  id: Scalars['String'],
  dueDate: Scalars['Int'],
};

export type SetTaskPayoutEvent = TaskEvent & {
   __typename?: 'SetTaskPayoutEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
};

export type SetTaskPayoutInput = {
  id: Scalars['String'],
  amount: Scalars['String'],
  tokenAddress: Scalars['String'],
  ethDomainId: Scalars['Int'],
};

export type SetTaskSkillEvent = TaskEvent & {
   __typename?: 'SetTaskSkillEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  ethSkillId: Scalars['Int'],
};

export type SetTaskSkillInput = {
  id: Scalars['String'],
  ethSkillId: Scalars['Int'],
};

export type SetTaskTitleEvent = TaskEvent & {
   __typename?: 'SetTaskTitleEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  title: Scalars['String'],
};

export type SetTaskTitleInput = {
  id: Scalars['String'],
  title: Scalars['String'],
};

export type SetUserTokenAvatarInput = {
  tokenAddress: Scalars['String'],
  iconHash?: Maybe<Scalars['String']>,
};

export type SubscribeToColonyInput = {
  colonyAddress: Scalars['String'],
};

export type Task = {
   __typename?: 'Task',
  id: Scalars['String'],
  createdAt: Scalars['GraphQLDateTime'],
  ethTaskId?: Maybe<Scalars['Int']>,
  ethDomainId: Scalars['Int'],
  ethSkillId?: Maybe<Scalars['Int']>,
  cancelledAt?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  dueDate?: Maybe<Scalars['Int']>,
  finalizedAt?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  colony?: Maybe<Colony>,
  colonyAddress: Scalars['String'],
  creator?: Maybe<User>,
  creatorAddress: Scalars['String'],
  assignedWorker?: Maybe<User>,
  assignedWorkerAddress?: Maybe<Scalars['String']>,
  workInvites: Array<User>,
  workInviteAddresses: Array<Scalars['String']>,
  workRequests: Array<User>,
  workRequestAddresses: Array<Scalars['String']>,
  events: Array<Event>,
};

export type TaskEvent = {
  type: Scalars['String'],
  taskId: Scalars['String'],
};

export type TaskIdInput = {
  id: Scalars['String'],
};

export type TaskMessageEvent = TaskEvent & {
   __typename?: 'TaskMessageEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  message: Scalars['String'],
};

export type Token = IToken & {
   __typename?: 'Token',
  id: Scalars['String'],
  createdAt: Scalars['GraphQLDateTime'],
  address: Scalars['String'],
  name: Scalars['String'],
  symbol: Scalars['String'],
  iconHash?: Maybe<Scalars['String']>,
};

export type UnassignWorkerEvent = TaskEvent & {
   __typename?: 'UnassignWorkerEvent',
  type: Scalars['String'],
  taskId: Scalars['String'],
  workerAddress: Scalars['String'],
};

export type UnassignWorkerInput = {
  id: Scalars['String'],
  workerAddress: Scalars['String'],
};

export type UnsubscribeFromColonyInput = {
  colonyAddress: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['String'],
  createdAt: Scalars['GraphQLDateTime'],
  profile: UserProfile,
  colonies: Array<Colony>,
  colonyAddresses: Array<Scalars['String']>,
  tasks: Array<Task>,
  taskIds: Array<Scalars['String']>,
  tokens: Array<UserToken>,
  tokenRefs: Array<Maybe<UserTokenRef>>,
  notifications?: Maybe<Array<Notification>>,
};


export type UserNotificationsArgs = {
  read?: Maybe<Scalars['Boolean']>
};

export type UserProfile = {
   __typename?: 'UserProfile',
  username?: Maybe<Scalars['String']>,
  avatarHash?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  displayName?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  walletAddress: Scalars['String'],
  website?: Maybe<Scalars['String']>,
};

export type UserToken = IToken & {
   __typename?: 'UserToken',
  id: Scalars['String'],
  createdAt: Scalars['GraphQLDateTime'],
  address: Scalars['String'],
  name: Scalars['String'],
  symbol: Scalars['String'],
  iconHash?: Maybe<Scalars['String']>,
};

export type UserTokenRef = {
   __typename?: 'UserTokenRef',
  address: Scalars['String'],
  iconHash?: Maybe<Scalars['String']>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  GraphQLDateTime: ResolverTypeWrapper<Scalars['GraphQLDateTime']>,
  UserProfile: ResolverTypeWrapper<UserProfile>,
  Colony: ResolverTypeWrapper<Colony>,
  Task: ResolverTypeWrapper<Task>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Event: ResolverTypeWrapper<Omit<Event, 'context'> & { context: ResolversTypes['EventContext'] }>,
  EventContext: ResolversTypes['AssignWorkerEvent'] | ResolversTypes['CancelTaskEvent'] | ResolversTypes['CreateDomainEvent'] | ResolversTypes['CreateTaskEvent'] | ResolversTypes['CreateWorkRequestEvent'] | ResolversTypes['FinalizeTaskEvent'] | ResolversTypes['RemoveTaskPayoutEvent'] | ResolversTypes['SendWorkInviteEvent'] | ResolversTypes['SetTaskDescriptionEvent'] | ResolversTypes['SetTaskDomainEvent'] | ResolversTypes['SetTaskDueDateEvent'] | ResolversTypes['SetTaskPayoutEvent'] | ResolversTypes['SetTaskSkillEvent'] | ResolversTypes['SetTaskTitleEvent'] | ResolversTypes['TaskMessageEvent'] | ResolversTypes['UnassignWorkerEvent'],
  AssignWorkerEvent: ResolverTypeWrapper<AssignWorkerEvent>,
  TaskEvent: ResolverTypeWrapper<TaskEvent>,
  CancelTaskEvent: ResolverTypeWrapper<CancelTaskEvent>,
  CreateDomainEvent: ResolverTypeWrapper<CreateDomainEvent>,
  ColonyEvent: ResolverTypeWrapper<ColonyEvent>,
  CreateTaskEvent: ResolverTypeWrapper<CreateTaskEvent>,
  CreateWorkRequestEvent: ResolverTypeWrapper<CreateWorkRequestEvent>,
  FinalizeTaskEvent: ResolverTypeWrapper<FinalizeTaskEvent>,
  RemoveTaskPayoutEvent: ResolverTypeWrapper<RemoveTaskPayoutEvent>,
  SendWorkInviteEvent: ResolverTypeWrapper<SendWorkInviteEvent>,
  SetTaskDescriptionEvent: ResolverTypeWrapper<SetTaskDescriptionEvent>,
  SetTaskDomainEvent: ResolverTypeWrapper<SetTaskDomainEvent>,
  SetTaskDueDateEvent: ResolverTypeWrapper<SetTaskDueDateEvent>,
  SetTaskPayoutEvent: ResolverTypeWrapper<SetTaskPayoutEvent>,
  SetTaskSkillEvent: ResolverTypeWrapper<SetTaskSkillEvent>,
  SetTaskTitleEvent: ResolverTypeWrapper<SetTaskTitleEvent>,
  TaskMessageEvent: ResolverTypeWrapper<TaskMessageEvent>,
  UnassignWorkerEvent: ResolverTypeWrapper<UnassignWorkerEvent>,
  Domain: ResolverTypeWrapper<Domain>,
  ColonyToken: ResolverTypeWrapper<ColonyToken>,
  IToken: ResolverTypeWrapper<IToken>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ColonyTokenRef: ResolverTypeWrapper<ColonyTokenRef>,
  UserToken: ResolverTypeWrapper<UserToken>,
  UserTokenRef: ResolverTypeWrapper<UserTokenRef>,
  Notification: ResolverTypeWrapper<Notification>,
  Token: ResolverTypeWrapper<Token>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateUserInput: CreateUserInput,
  EditUserInput: EditUserInput,
  SubscribeToColonyInput: SubscribeToColonyInput,
  UnsubscribeFromColonyInput: UnsubscribeFromColonyInput,
  CreateColonyInput: CreateColonyInput,
  EditColonyProfileInput: EditColonyProfileInput,
  CreateDomainInput: CreateDomainInput,
  EditDomainNameInput: EditDomainNameInput,
  AssignWorkerInput: AssignWorkerInput,
  TaskIdInput: TaskIdInput,
  CreateTaskInput: CreateTaskInput,
  CreateWorkRequestInput: CreateWorkRequestInput,
  RemoveTaskPayoutInput: RemoveTaskPayoutInput,
  SendWorkInviteInput: SendWorkInviteInput,
  SetTaskDomainInput: SetTaskDomainInput,
  SetTaskDescriptionInput: SetTaskDescriptionInput,
  SetTaskDueDateInput: SetTaskDueDateInput,
  SetTaskPayoutInput: SetTaskPayoutInput,
  SetTaskSkillInput: SetTaskSkillInput,
  SetTaskTitleInput: SetTaskTitleInput,
  UnassignWorkerInput: UnassignWorkerInput,
  CreateTokenInput: CreateTokenInput,
  AddColonyTokenReferenceInput: AddColonyTokenReferenceInput,
  AddUserTokenReferenceInput: AddUserTokenReferenceInput,
  SetColonyTokenAvatarInput: SetColonyTokenAvatarInput,
  SetUserTokenAvatarInput: SetUserTokenAvatarInput,
  MarkNotificationAsReadInput: MarkNotificationAsReadInput,
  SendTaskMessageInput: SendTaskMessageInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  User: User,
  GraphQLDateTime: Scalars['GraphQLDateTime'],
  UserProfile: UserProfile,
  Colony: Colony,
  Task: Task,
  Int: Scalars['Int'],
  Event: Omit<Event, 'context'> & { context: ResolversParentTypes['EventContext'] },
  EventContext: ResolversParentTypes['AssignWorkerEvent'] | ResolversParentTypes['CancelTaskEvent'] | ResolversParentTypes['CreateDomainEvent'] | ResolversParentTypes['CreateTaskEvent'] | ResolversParentTypes['CreateWorkRequestEvent'] | ResolversParentTypes['FinalizeTaskEvent'] | ResolversParentTypes['RemoveTaskPayoutEvent'] | ResolversParentTypes['SendWorkInviteEvent'] | ResolversParentTypes['SetTaskDescriptionEvent'] | ResolversParentTypes['SetTaskDomainEvent'] | ResolversParentTypes['SetTaskDueDateEvent'] | ResolversParentTypes['SetTaskPayoutEvent'] | ResolversParentTypes['SetTaskSkillEvent'] | ResolversParentTypes['SetTaskTitleEvent'] | ResolversParentTypes['TaskMessageEvent'] | ResolversParentTypes['UnassignWorkerEvent'],
  AssignWorkerEvent: AssignWorkerEvent,
  TaskEvent: TaskEvent,
  CancelTaskEvent: CancelTaskEvent,
  CreateDomainEvent: CreateDomainEvent,
  ColonyEvent: ColonyEvent,
  CreateTaskEvent: CreateTaskEvent,
  CreateWorkRequestEvent: CreateWorkRequestEvent,
  FinalizeTaskEvent: FinalizeTaskEvent,
  RemoveTaskPayoutEvent: RemoveTaskPayoutEvent,
  SendWorkInviteEvent: SendWorkInviteEvent,
  SetTaskDescriptionEvent: SetTaskDescriptionEvent,
  SetTaskDomainEvent: SetTaskDomainEvent,
  SetTaskDueDateEvent: SetTaskDueDateEvent,
  SetTaskPayoutEvent: SetTaskPayoutEvent,
  SetTaskSkillEvent: SetTaskSkillEvent,
  SetTaskTitleEvent: SetTaskTitleEvent,
  TaskMessageEvent: TaskMessageEvent,
  UnassignWorkerEvent: UnassignWorkerEvent,
  Domain: Domain,
  ColonyToken: ColonyToken,
  IToken: IToken,
  Boolean: Scalars['Boolean'],
  ColonyTokenRef: ColonyTokenRef,
  UserToken: UserToken,
  UserTokenRef: UserTokenRef,
  Notification: Notification,
  Token: Token,
  Mutation: {},
  CreateUserInput: CreateUserInput,
  EditUserInput: EditUserInput,
  SubscribeToColonyInput: SubscribeToColonyInput,
  UnsubscribeFromColonyInput: UnsubscribeFromColonyInput,
  CreateColonyInput: CreateColonyInput,
  EditColonyProfileInput: EditColonyProfileInput,
  CreateDomainInput: CreateDomainInput,
  EditDomainNameInput: EditDomainNameInput,
  AssignWorkerInput: AssignWorkerInput,
  TaskIdInput: TaskIdInput,
  CreateTaskInput: CreateTaskInput,
  CreateWorkRequestInput: CreateWorkRequestInput,
  RemoveTaskPayoutInput: RemoveTaskPayoutInput,
  SendWorkInviteInput: SendWorkInviteInput,
  SetTaskDomainInput: SetTaskDomainInput,
  SetTaskDescriptionInput: SetTaskDescriptionInput,
  SetTaskDueDateInput: SetTaskDueDateInput,
  SetTaskPayoutInput: SetTaskPayoutInput,
  SetTaskSkillInput: SetTaskSkillInput,
  SetTaskTitleInput: SetTaskTitleInput,
  UnassignWorkerInput: UnassignWorkerInput,
  CreateTokenInput: CreateTokenInput,
  AddColonyTokenReferenceInput: AddColonyTokenReferenceInput,
  AddUserTokenReferenceInput: AddUserTokenReferenceInput,
  SetColonyTokenAvatarInput: SetColonyTokenAvatarInput,
  SetUserTokenAvatarInput: SetUserTokenAvatarInput,
  MarkNotificationAsReadInput: MarkNotificationAsReadInput,
  SendTaskMessageInput: SendTaskMessageInput,
};

export type AssignWorkerEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssignWorkerEvent'] = ResolversParentTypes['AssignWorkerEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  workerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type CancelTaskEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['CancelTaskEvent'] = ResolversParentTypes['CancelTaskEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ColonyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Colony'] = ResolversParentTypes['Colony']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['GraphQLDateTime'], ParentType, ContextType>,
  colonyAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  founderAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  colonyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  avatarHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  guideline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  taskIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
  domains?: Resolver<Array<ResolversTypes['Domain']>, ParentType, ContextType>,
  founder?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  subscribedUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  tokens?: Resolver<Array<ResolversTypes['ColonyToken']>, ParentType, ContextType>,
  tokenRefs?: Resolver<Array<ResolversTypes['ColonyTokenRef']>, ParentType, ContextType>,
};

export type ColonyEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ColonyEvent'] = ResolversParentTypes['ColonyEvent']> = {
  __resolveType: TypeResolveFn<'CreateDomainEvent', ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  colonyAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ColonyTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ColonyToken'] = ResolversParentTypes['ColonyToken']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['GraphQLDateTime'], ParentType, ContextType>,
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  iconHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  isExternal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  isNative?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type ColonyTokenRefResolvers<ContextType = any, ParentType extends ResolversParentTypes['ColonyTokenRef'] = ResolversParentTypes['ColonyTokenRef']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  isExternal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  isNative?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  iconHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type CreateDomainEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateDomainEvent'] = ResolversParentTypes['CreateDomainEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  ethDomainId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  colonyAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type CreateTaskEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTaskEvent'] = ResolversParentTypes['CreateTaskEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  ethDomainId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  colonyAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type CreateWorkRequestEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateWorkRequestEvent'] = ResolversParentTypes['CreateWorkRequestEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type DomainResolvers<ContextType = any, ParentType extends ResolversParentTypes['Domain'] = ResolversParentTypes['Domain']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['GraphQLDateTime'], ParentType, ContextType>,
  colonyAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  ethDomainId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  ethParentDomainId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  colony?: Resolver<Maybe<ResolversTypes['Colony']>, ParentType, ContextType>,
  parent?: Resolver<Maybe<ResolversTypes['Domain']>, ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['GraphQLDateTime'], ParentType, ContextType>,
  initiator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  initiatorAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sourceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sourceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  context?: Resolver<ResolversTypes['EventContext'], ParentType, ContextType>,
};

export type EventContextResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventContext'] = ResolversParentTypes['EventContext']> = {
  __resolveType: TypeResolveFn<'AssignWorkerEvent' | 'CancelTaskEvent' | 'CreateDomainEvent' | 'CreateTaskEvent' | 'CreateWorkRequestEvent' | 'FinalizeTaskEvent' | 'RemoveTaskPayoutEvent' | 'SendWorkInviteEvent' | 'SetTaskDescriptionEvent' | 'SetTaskDomainEvent' | 'SetTaskDueDateEvent' | 'SetTaskPayoutEvent' | 'SetTaskSkillEvent' | 'SetTaskTitleEvent' | 'TaskMessageEvent' | 'UnassignWorkerEvent', ParentType, ContextType>
};

export type FinalizeTaskEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['FinalizeTaskEvent'] = ResolversParentTypes['FinalizeTaskEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export interface GraphQlDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GraphQLDateTime'], any> {
  name: 'GraphQLDateTime'
}

export type ITokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['IToken'] = ResolversParentTypes['IToken']> = {
  __resolveType: TypeResolveFn<'ColonyToken' | 'UserToken' | 'Token', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['GraphQLDateTime'], ParentType, ContextType>,
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  iconHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>,
  editUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationEditUserArgs, 'input'>>,
  subscribeToColony?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSubscribeToColonyArgs, 'input'>>,
  unsubscribeFromColony?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUnsubscribeFromColonyArgs, 'input'>>,
  createColony?: Resolver<Maybe<ResolversTypes['Colony']>, ParentType, ContextType, RequireFields<MutationCreateColonyArgs, 'input'>>,
  editColonyProfile?: Resolver<Maybe<ResolversTypes['Colony']>, ParentType, ContextType, RequireFields<MutationEditColonyProfileArgs, 'input'>>,
  createDomain?: Resolver<Maybe<ResolversTypes['Domain']>, ParentType, ContextType, RequireFields<MutationCreateDomainArgs, 'input'>>,
  editDomainName?: Resolver<Maybe<ResolversTypes['Domain']>, ParentType, ContextType, RequireFields<MutationEditDomainNameArgs, 'input'>>,
  assignWorker?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationAssignWorkerArgs, 'input'>>,
  cancelTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationCancelTaskArgs, 'input'>>,
  createTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'input'>>,
  createWorkRequest?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationCreateWorkRequestArgs, 'input'>>,
  finalizeTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationFinalizeTaskArgs, 'input'>>,
  removeTaskPayout?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationRemoveTaskPayoutArgs, 'input'>>,
  sendWorkInvite?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationSendWorkInviteArgs, 'input'>>,
  setTaskDomain?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationSetTaskDomainArgs, 'input'>>,
  setTaskDescription?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationSetTaskDescriptionArgs, 'input'>>,
  setTaskDueDate?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationSetTaskDueDateArgs, 'input'>>,
  setTaskPayout?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationSetTaskPayoutArgs, 'input'>>,
  setTaskSkill?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationSetTaskSkillArgs, 'input'>>,
  setTaskTitle?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationSetTaskTitleArgs, 'input'>>,
  unassignWorker?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationUnassignWorkerArgs, 'input'>>,
  createToken?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationCreateTokenArgs, 'input'>>,
  addColonyTokenReference?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationAddColonyTokenReferenceArgs, 'input'>>,
  addUserTokenReference?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationAddUserTokenReferenceArgs, 'input'>>,
  setColonyTokenAvatar?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationSetColonyTokenAvatarArgs, 'input'>>,
  setUserTokenAvatar?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationSetUserTokenAvatarArgs, 'input'>>,
  markAllNotificationsAsRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  markNotificationAsRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMarkNotificationAsReadArgs, 'input'>>,
  sendTaskMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSendTaskMessageArgs, 'input'>>,
};

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>,
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'address'>>,
  colony?: Resolver<ResolversTypes['Colony'], ParentType, ContextType, RequireFields<QueryColonyArgs, 'address'>>,
  domain?: Resolver<ResolversTypes['Domain'], ParentType, ContextType, RequireFields<QueryDomainArgs, 'colonyAddress' | 'ethDomainId'>>,
  task?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>,
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<QueryTokenArgs, 'address'>>,
};

export type RemoveTaskPayoutEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveTaskPayoutEvent'] = ResolversParentTypes['RemoveTaskPayoutEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  amount?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type SendWorkInviteEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendWorkInviteEvent'] = ResolversParentTypes['SendWorkInviteEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  amount?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type SetTaskDescriptionEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetTaskDescriptionEvent'] = ResolversParentTypes['SetTaskDescriptionEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type SetTaskDomainEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetTaskDomainEvent'] = ResolversParentTypes['SetTaskDomainEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  ethDomainId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type SetTaskDueDateEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetTaskDueDateEvent'] = ResolversParentTypes['SetTaskDueDateEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  dueDate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type SetTaskPayoutEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetTaskPayoutEvent'] = ResolversParentTypes['SetTaskPayoutEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type SetTaskSkillEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetTaskSkillEvent'] = ResolversParentTypes['SetTaskSkillEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  ethSkillId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type SetTaskTitleEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetTaskTitleEvent'] = ResolversParentTypes['SetTaskTitleEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['GraphQLDateTime'], ParentType, ContextType>,
  ethTaskId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  ethDomainId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  ethSkillId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  cancelledAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  dueDate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  finalizedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  colony?: Resolver<Maybe<ResolversTypes['Colony']>, ParentType, ContextType>,
  colonyAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  creatorAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  assignedWorker?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  assignedWorkerAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  workInvites?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  workInviteAddresses?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  workRequests?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  workRequestAddresses?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>,
};

export type TaskEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskEvent'] = ResolversParentTypes['TaskEvent']> = {
  __resolveType: TypeResolveFn<'AssignWorkerEvent' | 'CancelTaskEvent' | 'CreateTaskEvent' | 'CreateWorkRequestEvent' | 'FinalizeTaskEvent' | 'RemoveTaskPayoutEvent' | 'SendWorkInviteEvent' | 'SetTaskDescriptionEvent' | 'SetTaskDomainEvent' | 'SetTaskDueDateEvent' | 'SetTaskPayoutEvent' | 'SetTaskSkillEvent' | 'SetTaskTitleEvent' | 'TaskMessageEvent' | 'UnassignWorkerEvent', ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TaskMessageEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskMessageEvent'] = ResolversParentTypes['TaskMessageEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['GraphQLDateTime'], ParentType, ContextType>,
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  iconHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type UnassignWorkerEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnassignWorkerEvent'] = ResolversParentTypes['UnassignWorkerEvent']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  workerAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['GraphQLDateTime'], ParentType, ContextType>,
  profile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType>,
  colonies?: Resolver<Array<ResolversTypes['Colony']>, ParentType, ContextType>,
  colonyAddresses?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
  taskIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  tokens?: Resolver<Array<ResolversTypes['UserToken']>, ParentType, ContextType>,
  tokenRefs?: Resolver<Array<Maybe<ResolversTypes['UserTokenRef']>>, ParentType, ContextType>,
  notifications?: Resolver<Maybe<Array<ResolversTypes['Notification']>>, ParentType, ContextType, UserNotificationsArgs>,
};

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  avatarHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  walletAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type UserTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserToken'] = ResolversParentTypes['UserToken']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['GraphQLDateTime'], ParentType, ContextType>,
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  iconHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type UserTokenRefResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserTokenRef'] = ResolversParentTypes['UserTokenRef']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  iconHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  AssignWorkerEvent?: AssignWorkerEventResolvers<ContextType>,
  CancelTaskEvent?: CancelTaskEventResolvers<ContextType>,
  Colony?: ColonyResolvers<ContextType>,
  ColonyEvent?: ColonyEventResolvers,
  ColonyToken?: ColonyTokenResolvers<ContextType>,
  ColonyTokenRef?: ColonyTokenRefResolvers<ContextType>,
  CreateDomainEvent?: CreateDomainEventResolvers<ContextType>,
  CreateTaskEvent?: CreateTaskEventResolvers<ContextType>,
  CreateWorkRequestEvent?: CreateWorkRequestEventResolvers<ContextType>,
  Domain?: DomainResolvers<ContextType>,
  Event?: EventResolvers<ContextType>,
  EventContext?: EventContextResolvers,
  FinalizeTaskEvent?: FinalizeTaskEventResolvers<ContextType>,
  GraphQLDateTime?: GraphQLScalarType,
  IToken?: ITokenResolvers,
  Mutation?: MutationResolvers<ContextType>,
  Notification?: NotificationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  RemoveTaskPayoutEvent?: RemoveTaskPayoutEventResolvers<ContextType>,
  SendWorkInviteEvent?: SendWorkInviteEventResolvers<ContextType>,
  SetTaskDescriptionEvent?: SetTaskDescriptionEventResolvers<ContextType>,
  SetTaskDomainEvent?: SetTaskDomainEventResolvers<ContextType>,
  SetTaskDueDateEvent?: SetTaskDueDateEventResolvers<ContextType>,
  SetTaskPayoutEvent?: SetTaskPayoutEventResolvers<ContextType>,
  SetTaskSkillEvent?: SetTaskSkillEventResolvers<ContextType>,
  SetTaskTitleEvent?: SetTaskTitleEventResolvers<ContextType>,
  Task?: TaskResolvers<ContextType>,
  TaskEvent?: TaskEventResolvers,
  TaskMessageEvent?: TaskMessageEventResolvers<ContextType>,
  Token?: TokenResolvers<ContextType>,
  UnassignWorkerEvent?: UnassignWorkerEventResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  UserProfile?: UserProfileResolvers<ContextType>,
  UserToken?: UserTokenResolvers<ContextType>,
  UserTokenRef?: UserTokenRefResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
