// source.config.ts
import {
  defineCollections,
  defineConfig,
  defineDocs
} from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import {
  createFileSystemGeneratorCache,
  createGenerator,
  remarkAutoTypeTable
} from "fumadocs-typescript";
import * as z from "zod";
var docs = defineDocs({
  dir: "./content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true
    }
  }
});
var changelogCollection = defineCollections({
  type: "doc",
  dir: "./content/changelogs",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date()
  })
});
var blogCollection = defineCollections({
  type: "doc",
  dir: "./content/blogs",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.object({
      name: z.string(),
      avatar: z.string(),
      twitter: z.string().optional()
    }),
    image: z.string(),
    tags: z.array(z.string())
  })
});
var generator = createGenerator({
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript")
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkNpmOptions: {
      persist: {
        id: "persist-install"
      }
    },
    remarkPlugins: [[remarkAutoTypeTable, { generator }]]
  },
  plugins: [lastModified()]
});
export {
  blogCollection,
  changelogCollection,
  source_config_default as default,
  docs
};
