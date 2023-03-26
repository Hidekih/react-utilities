export const stitchesJsStylesTemplate = (componentName: string) => {
    return (
        `import { styled } from "@config/stitches.config"; \n` +
        `\n` +
        `export const ${componentName}Container = styled("div", {}) \n` 
    );
};