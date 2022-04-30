import type { Resolvers } from '#internal/types'
import merge from 'lodash.merge'

export function mergeResolvers(...resolversArray: Resolvers[]): Resolvers {
    if (resolversArray.length === 1) {
        return resolversArray[0]
    }

    let mergedResolvers: Resolvers = {}

    for (const resolvers of resolversArray) {
        mergedResolvers = merge(mergedResolvers, resolvers)
    }

    return mergedResolvers
}
