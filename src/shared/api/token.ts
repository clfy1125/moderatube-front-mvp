export const removeTokens = () => {
  if (getTokens() !== null) localStorage.removeItem('tokens');
};

export const getTokens = (): string | null => (typeof localStorage === 'object' ? localStorage.getItem('tokens') : null);
export const setTokens = <T>(accessToken: T, refreshToken: T) => localStorage.setItem('tokens', JSON.stringify({ accessToken, refreshToken }));
