import { websiteName } from "../../constants/textValues";

const createArrayOfLetters = `${websiteName.span} ${websiteName.name}`.split(
  ""
);

export const Loading = () => (
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

