export const indexTemplate = (componentName: string) => {
  return (
    `export { ${componentName} } from "./${componentName}"; \r\f` +
    `export type { ${componentName}Props } from "./${componentName}"; \r\f`
  );
};
