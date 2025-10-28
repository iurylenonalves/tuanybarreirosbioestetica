import { type SchemaTypeDefinition } from 'sanity'

// 1. Importe seus novos schemas
import blockContent from './blockContent'
import post from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  // 2. Adicione seus schemas ao array 'types'
  types: [post, blockContent],
}