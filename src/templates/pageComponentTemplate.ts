export const pageComponentTemplate = (componentName: string) => {
  return (
    `import type { GetServerSideProps, GetStaticProps, GetStaticPaths } from "next"; \n` +
    `import React, { ReactElement } from "react"; \n` +
    `\n` +
    `type PageProps = { \n` +
    `\t\n` +
    `}\n` +
    `\n` +
    `const Page${componentName} = ({ }: PageProps) => { \n` +
    `\treturn ( \n` +
    `\t\t<div> \n` +
    `\t\t\t\n` +
    `\t\t</div> \n` +
    `\t) \n` +
    `}\n` +
    `\n` +
    `// NextJs Layout https://nextjs.org/docs/basic-features/layouts \n` +
    `// Page${componentName}.getLayout = (page: ReactElement) => {\n` +
    `// \treturn ( \n` +
    `// \t\t<> \n` +
    `// \t\t\t{page} \n` +
    `// \t\t</> \n` +
    `// \t) \n` +
    `//}\n` +
    `\n` +
    `//export const getStaticPaths: GetStaticPaths = async () => { \n` +
    `// \treturn { \n` +
    `// \t\tpaths: [], \n` +
    `// \t\tfallback: "blocking", \n` +
    `// \t}; \n` +
    `//}; \n` +
    `\n` +
    `// export const getStaticProps: GetStaticProps<PageProps> = async (context) => { \n` +
    `// \treturn { \n` +
    `// \t\tprops: { \n` +
    `// \t\t}, \n` +
    `// \t\trevalidate: 60 * 10, // 10 min, \n` +
    `// \t}; \n` +
    `// }; \n` +
    `\n` +
    `// export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => { \n` +
    `// \treturn { \n` +
    `// \t\tprops: { \n` +
    `// \t\t}, \n` +
    `// \t}; \n` +
    `// }; \n` +
    `\n` +
    `export default Page${componentName}; \n`
  );
};
