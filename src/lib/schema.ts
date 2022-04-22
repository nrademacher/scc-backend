import { loadSchemaSync } from '@graphql-tools/load'
import { join } from 'node:path'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { resolvers } from '#internal/modules'

const baseSchema = loadSchemaSync(join(__dirname, '../modules/**/*.graphql'), {
    loaders: [new GraphQLFileLoader()],
})

export const schema = addResolversToSchema({
    schema: baseSchema,
    resolvers,
})
