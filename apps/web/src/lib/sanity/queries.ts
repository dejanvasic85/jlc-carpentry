import { client } from './client'
import { type QueryParams } from 'next-sanity'
import { z } from 'zod'

export async function sanityFetch<T>({
  query,
  params = {},
  schema,
  revalidate = 60,
  tags = [],
}: {
  query: string
  params?: QueryParams
  schema: z.ZodSchema<T>
  revalidate?: number | false
  tags?: string[]
}): Promise<T> {
  const data = await client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })

  // Validate with Zod
  return schema.parse(data)
}