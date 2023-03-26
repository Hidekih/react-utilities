export const stitchesJsStylesTemplate = (query: string) => {
    return (
        `import { styled } from "@config/stitches.config"; \n` +
        `\n` +
        `export const ${query}Container = styled("div", {}) \n` 
    );
};