import { ELinkPath } from '@enums/enums';

const formatMangaPath = (id: number, name: string) => `
${ELinkPath.mangas}/${id}-${name.split(' ').join('-').toLowerCase()}
`;

export default formatMangaPath;
