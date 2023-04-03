const chapterIsActive = (currentId: number, chapterId?: string) => Boolean(
  chapterId && currentId === Number(chapterId),
);

export default chapterIsActive;
