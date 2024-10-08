import { useParams } from "react-router-dom";

import { useAuthors } from "../../context/authors";
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";

export const AuthorPage = () => {
  const { authorsList, authorLoading } = useAuthors();

  const { authorId } = useParams();

  const currentAuthor = authorsList.find((v) => v.id == authorId);

  if (!currentAuthor && authorLoading) {
    return <Loading />;
  } else if (!currentAuthor) {
    return <NotFound />;
  }
  const { image, author, birth, death, biography, nationality, award, works } =
    currentAuthor;

  return (
    <div className="author-page">
      <div className="wrapper">
        <div className="author-image-section">
          <img src={image} className="author-image" />
        </div>
        <div className="author-info-section">
          <h2 className="author-name">{author}</h2>
          <div className="author-nationality">{nationality}</div>
          <div className="author-biography">{biography}</div>
          <div className="author-award">
            Award: <span className="award">{award}</span>
          </div>
          <div className="author-birth-section">
            <div className="born-section">
              <span className="born-section-category">Born</span>
              <p className="birth-year">{birth}</p>
            </div>
            <div className="space"></div>
            <div className="death-section">
              <span className="born-section-category">Died</span>
              <p className="death-year">{death}</p>
            </div>
          </div>
          <div className="author-works">
            <h3 className="works-title">Notable works</h3>
            <div className="works-list">
              {works.map((work, index) => (
                <div key={index} className="work-element">
                  <img
                    src="https://m.media-amazon.com/images/I/61LQf6GWT4L._AC_UF1000,1000_QL80_.jpg"
                    className="work-image"
                  />
                  <span className="work-name">{work}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
