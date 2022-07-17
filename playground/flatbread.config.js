// import transformer from '@flatbread/transformer-yaml';
import {
  createScalar,
  defineConfig,
  markdownTransformer,
  yamlTransformer,
  filesystem,
} from 'flatbread';

const transformerConfig = {
  markdown: {
    gfm: true,
    externalLinks: true,
  },
};

const flatbreadImage = {
  type: createScalar(`type FlatbreadImage { src: String alt: String }`),
  resolve: async (source) => ({
    alt: 'a nice description',
    src: source,
  }),
};

export default defineConfig({
  source: filesystem(),
  transformer: [markdownTransformer(transformerConfig), yamlTransformer()],
  content: [
    {
      path: 'content/markdown/posts',
      collection: 'Post',
      refs: {
        authors: 'Author',
      },
    },
    {
      path: 'content/markdown/posts/[category]/[slug].md',
      collection: 'PostCategory',
      refs: {
        authors: 'Author',
      },
    },
    {
      path: 'content/markdown/posts/**/*.md',
      collection: 'PostCategoryBlob',
      refs: {
        authors: 'Author',
      },
    },
    {
      path: 'content/markdown/authors',
      collection: 'Author',
      refs: {
        friend: 'Author',
      },
    },
  ],
});
