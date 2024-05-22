import { BlockType } from '@interfaces/common';

const getBlockText = (block: BlockType) => block.copyright || block.rkn;

export default getBlockText;
