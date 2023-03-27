export const indexTemplate = (componentName: string) => {
  return (
    `export { ${componentName} } from "./${componentName}"; \n` +
    `export type { ${componentName}Props } from "./${componentName}"; \n`
  );
};
