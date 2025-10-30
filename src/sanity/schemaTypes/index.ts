import { type SchemaTypeDefinition } from 'sanity'

// 1. Importe seus novos schemas
import blockContent from './blockContent'
import post from './post'
import { productType } from './product'
import { categoryType } from './category'
import { servicePackageType } from './servicePackage'
import { reviewType } from './review'

export const schema: { types: SchemaTypeDefinition[] } = {
  // 2. Adicione seus schemas ao array 'types'
  types: [
    // Blog
    post, 
    blockContent,
    // E-commerce
    productType,
    categoryType,
    servicePackageType,
    reviewType
  ],
}