const formatTextWithoutSymbols = (
  value: string,
): string | null => value.replace(/[@!^&\\/\\#,+()$~%.'":*?<>{}-]+?/, '');

export default formatTextWithoutSymbols;
