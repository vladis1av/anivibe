import { ELinkPath } from '@enums/enums';

const formatAnimePath = (id: number, code: string) => `${ELinkPath.animes}/${id}-${code}`;

export default formatAnimePath;
