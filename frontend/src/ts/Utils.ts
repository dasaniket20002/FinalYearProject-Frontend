export const randomNumberInRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getUniqueRandomNumbers = (
	min: number,
	max: number,
	count: number
): number[] => {
	let randoms: number[] = [];
	while (randoms.length < count) {
		const random = randomNumberInRange(min, max);
		if (!randoms.includes(random)) {
			randoms.push(random);
		}
	}

	return randoms;
};

export const constructURLPath = (baseUrl: string, params: any): string => {
	let url = baseUrl + "?";
	for (const key in params) {
		url += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`;
	}
	url = url.slice(0, -1); // Remove the trailing "&"
	return url;
};
