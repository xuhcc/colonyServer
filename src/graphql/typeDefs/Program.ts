import { gql } from 'apollo-server-express'

export default gql`
  enum ProgramStatus {
    Draft
    Active
    Deleted
  }

  type Program {
    id: String! # mongodb ObjectId
    createdAt: GraphQLDateTime!
    creatorAddress: String!
    colonyAddress: String!
    title: String
    description: String
    levelIds: [String!]!
    levels: [Level!]!
    enrolledUserAddresses: [String!]!
    enrolled: Boolean! # Current user is enrolled
    status: ProgramStatus!
    submissions: [ProgramSubmission!]!
  }
`
