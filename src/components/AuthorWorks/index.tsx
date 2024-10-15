import { useNavigate } from "react-router-dom";
import { AuthorProp } from "../../types/AuthorBookType";

type Props = {
  works: string[];
  title: string;
  author: AuthorProp;
};

export function AuthorWorks({ works, title, author }: Props) {
  const navigate = useNavigate();
  return (
    <div className="works-section">
      <div className="list-section">
        <h2 className="list-section-title ">{title}</h2>
        {works.map((w, index) => (
          <div key={index} className="work-element">
            <span className="work-number">{index + 1}</span>
            <p className="work-name">{w}</p>
            <span
              className="author"
              onClick={() => navigate(`/author/${author.id}`)}
            >
              {author.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
