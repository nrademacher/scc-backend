import type { Resolvers } from '#internal/types'
import { mergeResolvers } from '#internal/utils'
import { userResolvers } from './user'
import { contractResolvers } from './contract'

export const resolvers: Resolvers = mergeResolvers(userResolvers, contractResolvers)
