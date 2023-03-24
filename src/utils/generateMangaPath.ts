import { ELinkPath } from '@enums/enums';

const generateMangaPath = (id: number, name: string) => `
${ELinkPath.mangas}/${id}-${name.split(' ').join('-').toLowerCase()}
`;

export default generateMangaPath;
