export const debounce = (handler: () => void, delay: number) => {
    const timeout = setTimeout(handler, delay);
    return timeout;
};