import { ELinkPath } from '@enums/enums';

const generateAnimePath = (id: number, code: string) => `${ELinkPath.animes}/${id}-${code}`;

export default generateAnimePath;
