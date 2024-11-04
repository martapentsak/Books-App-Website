import { useNavigate } from "react-router";

import { Card } from "../../components/Card";
import { Alert } from "../../components/Alert";
import { Loading } from "../../components/Loading";
import { ListSection } from "../../components/ListSection";
import { FilterContainer } from "../FilterContainer";

import { useBooks } from "../../context/books";

import { selectors } from "../../constants/textValues";

import { getGenres } from "../../utils/getGenres";
import { getSortedListOfCentury } from "../../utils/getSortedListOfCentury";

import { useFilterBooks } from "../../hooks/useFilterBooks";
import { NotFound } from "../../components/NotFound";

export const BookListPage = () => {
  const { books, loading, error, handleCloseBooksError } = useBooks();
  const { filteredAuthors, onFilterValueChange, onSearchValueChange } =
    useFilterBooks(books);

  const navigate = useNavigate();
  const selector = [
    {
      label: selectors.genres,
      options: getGenres(books),
    },
    {
      label: selectors.century,
      options: getSortedListOfCentury(books),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {error && <Alert error={error} onClose={handleCloseBooksError} />}
      <FilterContainer
        selector={selector}
        onFilterValueChange={onFilterValueChange}
        onSearchValueChange={onSearchValueChange}
      >
        {filteredAuthors.length > 0 ? (
          <ListSection wrap>
            {filteredAuthors.map(({ author, genres, id, ...other }, index) => (
              <Card
                key={index}
                className="book-list-card"
                subtitle={author}
                items={genres}
                {...other}
                onClick={() => navigate(`/book/${id}`)}
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
