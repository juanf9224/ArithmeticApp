type ResolutionMap = {
    [key:number]: number
};

/**
 * least-squares-fit
 * Calculate the least square fit linear regression of provided values
 * @param resMap - A Sass map of viewport width and size value combinations
 * @returns Linear equation as a calc() function
 * @example
 * font-size: least-squares-fit((576px: 24px, 768px: 24px, 992px: 34px));
 */
export const leastSquaresFit = (resMap: ResolutionMap): string => {
    const keys = Object.keys(resMap);

    // Get the number of provided breakpoints
    const length = keys?.length;
    if (length < 2) return '';

    // Calculate the Means
    let resTotal = 0;
    let valueTotal = 0;
    keys.forEach((k) => {
        const key = Number(k);
        resTotal += key;
        valueTotal += resMap[key];
    });

    const resMean = resTotal / length;
    const valueMean = valueTotal / length;

    let multipliedDiff = 0;
    let squareDiff = 0;
    keys.forEach((k) => {
        const key = Number(k);
        const resDiff = key - resMean;
        const valueDiff = resMap[key] - valueMean;

        multipliedDiff += (resDiff * valueDiff);

        // Sum of squared resolution differences
        squareDiff += (resDiff * resDiff);
    });

    // Calculate the Slope
    const m = multipliedDiff / squareDiff;

    // Calculate the Y-Intercept
    const b = valueMean - (m * resMean);

    // Return the CSS calc equation
    return `calc(${m * 100}vw + ${b}px) !important`;
};
