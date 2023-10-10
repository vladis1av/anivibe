const formatChapterTitle = (
  vol: number,
  chapter: number,
  title: string | null,
) => `Том ${vol}. Глава ${chapter} ${title ? `- ${title}` : ''}`;

export default formatChapterTitle;
