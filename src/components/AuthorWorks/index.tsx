import { useNavigate } from "react-router-dom";
import { Author } from "../../types/AuthorBookType";

type Props = {
  title: string;
  author: Author;
};

export function AuthorWorks({ title, author: { id, works, name } }: Props) {
  const navigate = useNavigate();
  return (
    <section className="works-section">
      <div className="list-section">
        <h2 className="list-section-title ">{title}</h2>
        {works.map(({ name: workName }, index) => (
          <div key={index} className="work-element">
            <span className="work-number">{index + 1}</span>
            <p className="work-name">{workName}</p>
            <span className="author" onClick={() => navigate(`/author/${id}`)}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
