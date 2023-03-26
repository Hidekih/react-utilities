export const componentTemplate = (query: string) => {
    return (
        `import { ReactNode } from "react"; \n` +
        `\n` +
        `import { ${query}Container } from "./${query}.styles"; \n` +
        `\n` +
        `export type ${query}Props = { \n` +
        `\tchildren: ReactNode;  \n` +
        `}\n` +
        `\n` +
        `export const ${query} = ({ children, ...props }: ${query}Props) => { \n` +
        `\treturn ( \n` +
        `\t\t<${query}Container> \n` +
        `\t\t\t {children} \n` +
        `\t\t</${query}Container> \n` +
        `\t) \n` +
        `}\n`
    );
};