import { useAuthors } from "./context/authors";
import { useBooks } from "./context/books";

import { AllRoutes } from "./pages/Routes";
import { LoadingPage } from "./pages/LoadingPage";

import "./App.css";
import "./styles/global.scss";

function App() {
  const { booksLoading } = useBooks();
  const { authorLoading } = useAuthors();
  return (
    <div className="books-app">
      {authorLoading || booksLoading ? <LoadingPage /> : <AllRoutes />}
    </div>
  );
}

export default App;
