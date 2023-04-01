export const getHeaders = (apiToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
};
