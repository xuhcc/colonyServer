import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: String! # wallet address
    createdAt: GraphQLDateTime!
    profile: UserProfile!
    colonies: [Colony!]!
    colonyAddresses: [String!]!
    tasks: [Task!]!
    taskIds: [String!]!
    tokenAddresses: [String!]!
    notifications(read: Boolean): [Notification!]! # Only provided for the current user
    completedLevels(colonyAddress: String!): [Level!]!
  }

  type UserProfile {
    username: String
    avatarHash: String
    bio: String
    displayName: String
    location: String
    walletAddress: String!
    website: String
  }
`
