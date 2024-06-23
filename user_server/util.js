/*
    if retries = 3
    wait 1s 2^0 
    wait 2s 2^1
    wait 4s 2^2
*/
const exponentialDelay = (retry) => {
  return Math.pow(2, retry - 1) * 1000;
};

export const retry = async (fn, retries) => {
  for (let i = 0; i < retries; i++) {
    try {
      await fn();
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(
        `Retry attempt ${i + 1} failed. Retrying in ${exponentialDelay(i + 1)} ms`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, exponentialDelay(i + 1))
      );
    }
  }
};
