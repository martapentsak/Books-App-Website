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
    <main className="author-page">
      <div className="wrapper">
        <div className="author-image-section">
          <img src={image} className="author-image" alt={authorName} />
        </div>
        <section className="author-info-section">
          <h2 className="author-name">{authorName}</h2>
          <p className="author-nationality">{nationality}</p>
          <p className="author-biography">{biography}</p>
          <p className="author-award">
            {authorPoetPageTitles.award}
            <span className="award">{award}</span>
          </p>
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
        </section>
      </div>
      <div className="smallwidth-notable-works">
        <NotableWorks works={works} />
      </div>
    </main>
  );
};
