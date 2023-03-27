export const storiesTemplate = (componentName: string) => {
  return (
    `import { ComponentMeta, ComponentStory } from "@storybook/react"; \n` +
    `import React from "react"; \n` +
    `import { ${componentName} } from "./${componentName}"; \n` +
    `\n` +
    `export default { \n` +
    `\ttitle: "TODO_OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO/${componentName}", \n` +
    `\tcomponent: ${componentName}, \n` +
    `\targTypes: { \n` +
    `\t\tref: { \n` +
    `\t\t\ttable: { \n` +
    `\t\t\t\tdisable: true, \n` +
    `\t\t\t}, \n` +
    `\t\t}, \n` +
    `\t\tcss: { \n` +
    `\t\t\ttable: { \n` +
    `\t\t\t\tdisable: true, \n` +
    `\t\t\t}, \n` +
    `\t\t}, \n` +
    `\t}, \n` +
    `\targs: {}, \n` +
    `} as ComponentMeta<typeof ${componentName}>; \n` +
    `\n` +
    `const Template: ComponentStory<typeof ${componentName}> = (args) => ( \n` +
    `\t<div style={{ width: "420px" }}> \n` +
    `\t\t<${componentName} {...args} /> \n` +
    `\t</div> \n` +
    `); \n` +
    `\n` +
    `export const Default = Template.bind({}); \n` +
    `Default.args = {}; \n`
  );
};
