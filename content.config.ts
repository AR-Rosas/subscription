import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const directory = defineCollection({
  type: 'page',
  source: 'directory/*.md',
  schema: z.object({
    slug: z.string().nonempty(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().url().optional(),
    readingTime: z.number().optional(),
    author: z.object({
      name: z.string(),
      role: z.string().optional(),
      avatar: z.string().url().optional()
    }).optional()
  })
})

export default defineContentConfig({
  collections: {
    directory,
    featuredLinks: defineCollection({
      type: 'page',
      source: 'featured-links/*.md',
      schema: z.object({
        slug: z.string().nonempty(),
        title: z.string(),
        description: z.string().optional(),
        items: z.array(z.object({
          title: z.string(),
          description: z.string().optional(),
          url: z.string().url(),
          tags: z.array(z.string()).default([])
        })).default([])
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/*.md',
      schema: z.object({
        slug: z.string(),
        hero: z.object({
          title: z.string(),
          description: z.string()
        }).optional(),
        sections: z.record(z.any()).optional()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        slug: z.string(),
        date: z.coerce.date().optional(),
        tags: z.array(z.string()).optional()
      })
    }),
    products: defineCollection({
      type: 'page',
      source: 'template/product/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.string(),
        comingSoon: z.boolean().default(false),
        purchaseUrl: z.string().url().optional(),
        image: z.string().url().optional(),
        tags: z.array(z.string()).default([]),
        features: z.array(z.string()).default([])
      })
    })
  }
})
