import { useState } from "react";

import { Card } from "../../components/Card";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

import { homepage } from "../../constants/textValues";

export const HomePage = () => {
  const [selectedPoetIndex, setSelectedPoetIndex] = useState<number>(0);
  const { authorsList, poetsList } = useAuthors();
  const { booksList } = useBooks();

  return (
    <div className="home-page">
      <div className="poets-section">
        <div className="selecled-poet-section">
          <p className="selecled-poet-title">{homepage.postContainerTitle}</p>
          {poetsList.length > 0 && poetsList[selectedPoetIndex]?.image && (
            <img
              src={poetsList[selectedPoetIndex].image}
              className="selected-poet-image"
            />
          )}
        </div>
        <div className="author-list">
          {poetsList.map(({ image, name }, index) => (
            <div
              onClick={() => setSelectedPoetIndex(index)}
              className={
                selectedPoetIndex === index
                  ? "active-poet-section"
                  : "poet-section"
              }
            >
              <img key={index} src={image} alt={name} className="poet-image" />
              {selectedPoetIndex === index && (
                <span style={{ color: "white" }} className="poet-name">
                  {name}
                </span>
              )}
            </div>
          ))}
        </div>
        <h2 className="popular-poet-work-title">{homepage.works}</h2>
        {poetsList[selectedPoetIndex]?.works?.map((value, index) => (
          <div key={index} className="poet-work-section">
            <span className="work-number">{index + 1}</span>
            <p className="work-name">{value}</p>
            <span className="author">{poetsList[selectedPoetIndex].name}</span>
          </div>
        ))}
      </div>
      <div className="authors-books-section">
        <div className="popular-authors-section">
          <h2 className="container-list-title ">{homepage.popularWriter}</h2>
          <div className="author-list">
            {authorsList.map((attributes, index) => (
              <Card isAuthorCard={true} {...attributes} key={index} />
            ))}
          </div>
        </div>
        <div className="popular-books-section">
          <h2 className="container-list-title">{homepage.popularBook}</h2>
          <div className="books-list-section">
            {booksList.map(({ title, author, coverImage, genre }, index) => (
              <Card
                isAuthorCard={false}
                name={title}
                author={author}
                key={index}
                image={coverImage}
                genre={genre}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
