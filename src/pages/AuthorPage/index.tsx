import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import { ListSection } from "../../components/ListSection";
import { Card } from "../../components/Card";

import { useAuthors } from "../../context/authors";

export const AuthorPage = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const { authors, loading } = useAuthors();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { authorId } = useParams();

  const currentAuthor = authors.find((v) => v.id == authorId);

  if (loading) {
    return <Loading />;
  }
  if (!currentAuthor) {
    return <NotFound />;
  }

  const {
    image,
    name,
    birth_year,
    death_year,
    biography,
    nationality,
    award,
    works,
  } = currentAuthor;

  return (
    <div className="author-page">
      <div className="wrapper">
        <div className="author-image-section">
          <img src={image} className="author-image" />
        </div>
        <div className="author-info-section">
          <h2 className="author-name">{name}</h2>
          <div className="author-nationality">{nationality}</div>
          <div className="author-biography">{biography}</div>
          <div className="author-award">
            Award: <span className="award">{award}</span>
          </div>
          <div className="author-birth-section">
            <div className="born-section">
              <span className="born-section-category">Born</span>
              <p className="birth-year">{birth_year}</p>
            </div>
            <div className="space"></div>
            <div className="death-section">
              <span className="born-section-category">Died</span>
              <p className="death-year">{death_year}</p>
            </div>
          </div>
          <div className={windowWidth >= 1100 ? "author-works" : "no-display"}>
            <ListSection title={"Notable works"}>
              {works.map((value, index) => (
                <Card
                  key={index}
                  className="works-card"
                  items={[""]}
                  title={value}
                  onClick={() => null}
                  image={
                    "https://m.media-amazon.com/images/I/61LQf6GWT4L._AC_UF1000,1000_QL80_.jpg"
                  }
                />
              ))}
            </ListSection>
          </div>
        </div>
        <div></div>
      </div>
      {windowWidth <= 1100 && (
        <div className="works-section">
          <ListSection title={"Notable works"}>
            {works.map((value, index) => (
              <Card
                key={index}
                className="works-card"
                items={[""]}
                title={value}
                onClick={() => null}
                image={
                  "https://m.media-amazon.com/images/I/61LQf6GWT4L._AC_UF1000,1000_QL80_.jpg"
                }
              />
            ))}
          </ListSection>
        </div>
      )}
    </div>
  );
};
