import { VideoElement_Type } from "./Types";

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

export const convertYTDuration = (duration: string): string =>
	msToDDHHMMSS(convertISO8601ToMs(duration));

export const convertISO8601ToMs = (duration: string): number => {
	const time_extractor = /^P([0-9]*D)?T([0-9]*H)?([0-9]*M)?([0-9]*S)?$/i;
	const extracted = time_extractor.exec(duration);
	if (extracted) {
		const days = parseInt(extracted[1], 10) || 0;
		const hours = parseInt(extracted[2], 10) || 0;
		const minutes = parseInt(extracted[3], 10) || 0;
		const seconds = parseInt(extracted[4], 10) || 0;
		return (
			days * 24 * 3600 * 1000 +
			hours * 3600 * 1000 +
			minutes * 60 * 1000 +
			seconds * 1000
		);
	}
	return 0;
};

export const msToDDHHMMSS = (ms: number): string => {
	// Convert milliseconds to seconds
	const seconds = ms / 1000;

	// Extract days
	const days = Math.floor(seconds / (3600 * 24));

	// Extract hours remaining after removing days
	const remainingSeconds = seconds % (3600 * 24);
	const hours = Math.floor(remainingSeconds / 3600);

	// Extract minutes remaining after removing hours
	const minutes = Math.floor((remainingSeconds % 3600) / 60);

	// Extract seconds remaining after removing minutes
	const secondsLeft = remainingSeconds % 60;

	// Format with leading zeros for hours, minutes, and seconds
	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	const formattedSeconds = secondsLeft.toString().padStart(2, "0");

	return `${days > 0 ? days + ":" : ""}
	${hours > 0 ? formattedHours + ":" : ""}
	${formattedMinutes}:
	${formattedSeconds}`;
};

export let checkSubsetForVideos = (
	parentArray: VideoElement_Type[],
	subsetArray: VideoElement_Type[]
) => {
	return subsetArray.every((el) => {
		for (let item in parentArray) {
			if (parentArray[item].id === el.id) return true;
		}
		return false;
	});
};
