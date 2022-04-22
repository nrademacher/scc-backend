import type { UserResolverContext } from './user'
import { mergeContexts } from '#internal/utils'
import { userContext } from './user'

// extend with type unions
export type ModuleContext = UserResolverContext

// extend with type intersections
export type ModuleContexts = UserResolverContext

export const moduleContexts = mergeContexts(userContext)
