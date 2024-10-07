import { websiteName } from "../../constants/textValues";
import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

const createArrayOfLetters = `${websiteName.span} ${websiteName.name}`.split(
  ""
);

export const Loading = () => {
  const { authorLoading } = useAuthors();
  const { booksLoading } = useBooks();

  if (!authorLoading && !booksLoading) {
    return null;
  }

  return (
    <div className="loading">
      <div className="flipping-text">
        {createArrayOfLetters.map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};
