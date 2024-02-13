import { ELinkPath } from '@enums/enums';

const formatMangaPath = (id: number, name: string) => {
  // REPLACE `-4040-she-is-wo>rki?'"ng-o.ut-/':;"--the-little!-master-2-34--4<-`
  // OUT 4040-she-is-working-out-the--little-master-2---344
  const currentName = name.toLowerCase();
  const mangaName = currentName
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/['’]/g, '');

  const currentMangaName = mangaName
    // eslint-disable-next-line no-useless-escape
    .replace(/[\W\-]/g, '-').replace(/[-]{2,}/g, '-').replace(/^-|-$/g, '');

  return `${ELinkPath.mangas}/${id}-${currentMangaName}`;
};

export default formatMangaPath;
