export const GetImageNameFromUrl = (url: string): string => {
	return url?.split('/').at(-1) ?? '';
};
