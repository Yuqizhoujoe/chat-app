export const exponentialDelay = (retries) => {
    return Math.pow(2, retries - 1) * 1000;
};
export const retry = async (fn, retries) => {
    for (let i = 0; i < retries; i++) {
        try {
            await fn();
            return;
        }
        catch (error) {
            if (i === retries - 1) {
                throw error;
            }
            console.log(`Retry attempt ${i + 1}: Retrying after ${exponentialDelay(i + 1)}ms`);
            await new Promise((resolve) => setTimeout(resolve, exponentialDelay(i + 1)));
        }
    }
};
