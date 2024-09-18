import { Routes, Route } from "react-router-dom";
import { HomePage } from "../HomePage";
import { menuElemenets } from "../../constants/textValues";
import { useAuthors } from "../../context/authors";
import { LoadingPage } from "../LoadingPage";
import { Menu } from "../../components/Menu";
import { useBooks } from "../../context/books";

export const RoutesPage = () => {
  const { loading: authorLoading } = useAuthors();
  const {loading: booksloading} = useBooks()
  console.log(booksloading, authorLoading)

  if (booksloading || authorLoading) {
    return <LoadingPage />;
  }
  return (
    <div>

      <Menu />

      <Routes>
        <Route path={menuElemenets.links.home} element={<HomePage />} />
      </Routes>
    </div>
  );
};
