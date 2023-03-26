export const getPathToNewFile = (params: {
	url: string; queryValue: string
}) => {
	const { url, queryValue } = params;

	const path = url.split("/").filter((e) => !!e).join("\\");

	return `${path}\\${queryValue}`;
};
