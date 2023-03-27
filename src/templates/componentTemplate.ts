export const componentTemplate = (params: { componentName: string, usingStitchesJs?: boolean, usingNextJsLayout?: boolean }) => {
  const { componentName, usingStitchesJs = false } = params;

  if (usingStitchesJs) {
    return (
      `import React, { ReactNode } from "react"; \n` +
      `// import { styled } from "@config/stitches.config"; \n` +
      `\n` +
      `import { ${componentName}ContainerCSS, Styled${componentName}Container } from "./${componentName}.styles"; \n` +
      `\n` +
      `// const Styled${componentName}Container = styled("div", ${componentName}ContainerCSS); \n` +
      `\n` +
      `export type ${componentName}Props = { \n` +
      `\tchildren: ReactNode;  \n` +
      `}\n` +
      `\n` +
      `export const ${componentName} = ({ children, ...props }: ${componentName}Props) => { \n` +
      `\treturn ( \n` +
      `\t\t<${componentName}Container> \n` +
      `\t\t\t{children} \n` +
      `\t\t</${componentName}Container> \n` +
      `\t) \n` +
      `}\n`
    );
  }

  return (
    `import React, { ReactNode } from "react"; \n` +
    `\n` +
    `export type ${componentName}Props = { \n` +
    `\tchildren: ReactNode;  \n` +
    `}\n` +
    `\n` +
    `export const ${componentName} = ({ children }: ${componentName}Props) => { \n` +
    `\treturn ( \n` +
    `\t\t<> \n` +
    `\t\t\t{children} \n` +
    `\t\t</> \n` +
    `\t) \n` +
    `}\n`
  );
};
