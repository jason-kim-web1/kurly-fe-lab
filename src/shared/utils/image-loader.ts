import type { ImageLoader } from 'next/legacy/image';

const imageLoader: ImageLoader = ({ src }) => src;

export default imageLoader;
