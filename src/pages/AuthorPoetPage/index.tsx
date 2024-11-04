import { useParams } from "react-router-dom";

import { Loading } from "../../components/Loading";

import { useAuthors } from "../../context/authors";
import { NotableWorks } from "./components/NotableWorks";
import { authorPoetPageTitles } from "../../constants/textValues";
import { NotFound } from "../../components/NotFound";
type Prop = {
  isPoetPage?: boolean;
};

export const AuthorPoetPage = ({ isPoetPage }: Prop) => {
  const { poets, authors, loading } = useAuthors();
  const { authorId } = useParams();

  const curentList = isPoetPage ? poets : authors;

  const {
    image,
    name: authorName,
    birthYear,
    deathYear,
    biography,
    nationality,
    award,
    works = [],
  } = curentList.find((v) => v.id == authorId) || {};

  if (loading) {
    return <Loading />;
  }
  if (!authorName) {
    return <NotFound />;
  }

  return (
    <div className="author-page">
      <div className="wrapper">
        <div className="author-image-section">
          <img src={image} className="author-image" />
        </div>
        <div className="author-info-section">
          <h2 className="author-name">{authorName}</h2>
          <div className="author-nationality">{nationality}</div>
          <div className="author-biography">{biography}</div>
          <div className="author-award">
            {authorPoetPageTitles.award}
            <span className="award">{award}</span>
          </div>
          <div className="author-birth-section">
            <div className="born-section">
              <span className="born-section-category">
                {authorPoetPageTitles.born}
              </span>
              <p className="birth-year">{birthYear}</p>
            </div>
            <div className="space"></div>
            <div className="death-section">
              <span className="born-section-category">
                {authorPoetPageTitles.died}
              </span>
              <p className="death-year">{deathYear}</p>
            </div>
          </div>
          <div className="notable-works">
            <NotableWorks works={works} />
          </div>
        </div>
      </div>
      <div className="smallwidth-notable-works">
        <NotableWorks works={works} />
      </div>
    </div>
  );
};
