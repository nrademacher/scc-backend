import type { Request } from 'express'
import type { ModuleContext } from '#internal/modules'
import merge from 'lodash.merge'

type ContextCreationFunction = (request: Request) => Promise<ModuleContext>

export function mergeContexts(...contextCreationFunctions: ContextCreationFunction[]) {
    return async function ({ req }: { req: Request }) {
        let baseResolverContext = {}

        for (const function_ of contextCreationFunctions) {
            baseResolverContext = merge(baseResolverContext, await function_(req))
        }

        return baseResolverContext
    }
}
