export const stitchesJsStylesTemplate = (componentName: string) => {
  return (
    `import { styled, css } from "@config/stitches.config"; \n` +
    `\n` +
    `// If want to export only a style object \n` +
    `export const ${componentName}ContainerCSS = css({}); \n` +
    `// If want to export a styled component \n` +
    `export const Styled${componentName}Container = styled("div", {}); \n`
  );
};
