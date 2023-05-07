/**
 * https://platform.openai.com/docs/guides/error-codes/api-errors
 */

export const getErrorMessage = (status: number) => {
  switch (status) {
    case 401:
      return 'Incorrect API key provided';

    case 429:
      return 'Rate limit reached for requests';

    case 500:
    default:
      return 'The server had an error while processing your request';
  }
};
