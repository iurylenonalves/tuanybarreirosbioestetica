import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import { productType } from './product'
import { categoryType } from './category'
import { servicePackageType } from './servicePackage'
import { reviewType } from './review'
import { heroType } from './hero'
import { aboutType } from './about'
import { methodologyType } from './methodology'
import { procedureType } from './procedure'
import { servicesHeroType } from './servicesHero'
import { order } from './order'
import { featuresType } from './features'
import { resultsType } from './results'

export const schema: { types: SchemaTypeDefinition[] } = {  
  types: [
    // Blog
    post, 
    blockContent,
    // E-commerce
    order,
    productType,
    categoryType,
    servicePackageType,
    reviewType,
    // Institucional
    heroType,
    resultsType,
    featuresType,
    aboutType,
    methodologyType,
    procedureType,
    servicesHeroType
  ],
}