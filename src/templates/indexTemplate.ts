export const indexTemplate = (query: string) => {
    return (
        `export { ${query} } from "./${query}"; \n` +
        `export type { ${query}Props } from "./${query}"; \n`
    );
};