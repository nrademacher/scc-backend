import { Resolvers } from '#internal/types'
import merge from 'lodash.merge'

export function mergeResolvers(...resolversArray: Resolvers[]): Resolvers {
    if (resolversArray.length === 1) {
        return resolversArray[0]
    }

    let merged: Resolvers = {}

    for (const resolvers of resolversArray) {
        merged = merge(merged, resolvers)
    }

    return merged
}
