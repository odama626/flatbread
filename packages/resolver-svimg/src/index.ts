import { createScalar } from '@flatbread/core';
import { Queue, generateComponentAttributes } from 'svimg/dist/process';

const SVIMG_TYPE = createScalar(`
type Svimg {
  srcset: String
  srcsetwebp: String;
  srcsetavif: String;
  placeholder: String;
  aspectratio: Float;
}`);

const queue = new Queue();

// copied from https://github.com/xiphux/svimg/blob/master/src/component/generate-component-attributes.ts#L9
interface Config {
  src: string;
  queue?: Queue;
  inputDir: string;
  outputDir: string;
  publicPath?: string;
  webp?: boolean;
  avif?: boolean;
  widths?: number[];
  quality?: number;
  skipGeneration?: boolean;
  skipPlaceholder?: boolean;
}

export default function createSvimgResolver(config: Omit<Config, 'src'>): any {
  return {
    type: SVIMG_TYPE,
    resole: (src: string) =>
      generateComponentAttributes({ queue, ...config, src }),
  };
}
