export const getPathToNewDir = (params: {
	url: string; dirName: string
}) => {
	const { url, dirName } = params;

	const path = url.split("/").filter((e) => !!e).join("\\");

	return `${path}\\${dirName}`;
};
