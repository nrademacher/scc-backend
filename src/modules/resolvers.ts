import type { Resolvers } from '#internal/types'
import { mergeResolvers } from '#internal/utils'
import { userResolvers } from './user'
import { chatResolvers } from './chat'

export const resolvers: Resolvers = mergeResolvers(userResolvers, chatResolvers)
