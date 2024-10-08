import { Card } from "../Card";

type CardProps = {
  id: string;
  image: string;
  title?: string;
  genres: string[];
  author: string;
};

type Props = {
  title: string;
  array?: CardProps[] | undefined,
  isAuthorCard: boolean;
  isWorkslist: boolean,
  works? : string[],
  author?: string
};

export const ListSection = ({ title, array, isAuthorCard, isWorkslist, works, author }: Props) => {
  return (
    <div className="list-section">
      <h2 className="list-section-title ">{title}</h2>
      {isWorkslist? 
       works?.map((value, index) => (
        <div key={index} className="works-list">
          <span className="work-number">{index + 1}</span>
          <p className="work-name">{value}</p>
          <span className="author">
            {author}
          </span>
        </div>
      ))
       :
      <div className={isAuthorCard ? "flex-list" : "flex-wrap-list"}>
        {array?.map((attributes, index) =>
          isAuthorCard ? (
            <Card isAuthorCard={isAuthorCard} {...attributes} key={index} />
          ) : (
            <div className="list-item">
            <Card key={index} isAuthorCard={isAuthorCard} {...attributes} />
            </div>
          )
        )}
      </div>}
    </div>
  );
};
