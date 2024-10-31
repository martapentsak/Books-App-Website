export const getGenres = <T extends { genres: string[] }>(list: T[]) => {
  const allGenres = list.flatMap(({ genres }) => genres);
  return [...new Set(allGenres)].sort();
};
