import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Public client - without token (for published content)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
})

// Client with token (for drafts) - server only
export const clientWithToken = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'drafts',
})
