export const handleGetGenres = <T extends { genres: string[] }>(list: T[]) => {
  const allGenres = list.flatMap(({ genres }) => genres);
  const genresWithoutDuplicates = allGenres
    .filter((item, index) => allGenres.indexOf(item) === index)
    .sort();
  return genresWithoutDuplicates;
};
