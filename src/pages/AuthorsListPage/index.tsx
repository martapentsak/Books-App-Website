import { useNavigate } from "react-router-dom";

import { Card } from "../../components/Card";
import { Alert } from "../../components/Alert";
import { Loading } from "../../components/Loading";
import { ListSection } from "../../components/ListSection";
import { FilterContainer } from "../FilterContainer";

import { useAuthors } from "../../context/authors";

import { selectors } from "../../constants/textValues";

import { getGenres } from "../../utils/getGenres";
import { getAuthorNationality } from "../../utils/getAuthorNationality";

import { useFilterPoetsAuthors } from "../../hooks/useFilterAuthorPoets";
import { NotFound } from "../../components/NotFound";

type Prop = {
  isPoetPage?: boolean;
};

export const AuthorsPoetsListPage = ({ isPoetPage }: Prop) => {
  const { authors, poets, loading, error, handleCloseAuthorsError } =
    useAuthors();
  const list = isPoetPage ? poets : authors;

  const { filteredAuthors, onFilterValueChange, onSearchValueChange } =
    useFilterPoetsAuthors(list);

  const navigate = useNavigate();

  const selector = [
    {
      label: selectors.genres,
      options: getGenres(list),
    },
    {
      label: selectors.nationality,
      options: getAuthorNationality(list),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {error && <Alert error={error} onClose={handleCloseAuthorsError} />}
      <FilterContainer
        selector={selector}
        onFilterValueChange={onFilterValueChange}
        onSearchValueChange={onSearchValueChange}
      >
        {filteredAuthors.length > 0 ? (
          <ListSection wrap>
            {filteredAuthors.map(({ name, genres, id, ...other }, index) => (
              <Card
                key={index}
                className="author-list-card"
                title={name}
                items={genres}
                {...other}
                onClick={() =>
                  navigate(`/${isPoetPage ? "poet" : "author"}/${id}`)
                }
              />
            ))}
          </ListSection>
        ) : (
          <NotFound />
        )}
      </FilterContainer>
    </div>
  );
};
