// Todo
export const storiesTemplate = (query: string) => {
    return (
        `import { styled } from "@config/stitches.config"; \n` +
        `\n` +
        `export const ${query}Container = styled("div", {}) \n` 
    );
};