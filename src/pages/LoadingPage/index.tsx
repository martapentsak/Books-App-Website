import { websiteName } from "../../constants/textValues";

export const LoadingPage = () => {
  const createArrayOfLetters = `${websiteName.span} ${websiteName.name}`.split("")
  return (
    <div className="loading-page">
  
      <div className="flipping-text">
      {createArrayOfLetters.map((letter, index) => (
        <span key={index} className="letter" style={{ animationDelay: `${index * 0.1}s` }}>
          {letter}
        </span>
      ))}
    </div>
    </div>
  );
};
