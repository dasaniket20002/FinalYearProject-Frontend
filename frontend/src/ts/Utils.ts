export const randomNumberInRange = (min: number, max: number): number => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
};

export const getUniqueRandomNumbers = (min: number, max: number, count: number): number[] => {
    let randoms: number[] = [];
    while (randoms.length < count) {
        const random = randomNumberInRange(min, max);
        if (!randoms.includes(random)) {
            randoms.push(random);
        }
    }

    return randoms;
};