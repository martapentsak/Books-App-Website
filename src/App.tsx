import { AllRoutes } from "./pages/Routes";
import { LoadingPage } from "./pages/LoadingPage";

import { useAuthors } from "./context/authors";
import { useBooks } from "./context/books";

import "./App.css";
import "./styles/global.scss";

function App() {
  const { authorLoading, authorListError } = useAuthors();
  const { booksLoading, bookListError } = useBooks();

  const isLoading = authorLoading || booksLoading;
  const error = authorListError ? authorListError : bookListError;

  if (error) {
    throw new Error(error);
  }
  return (
    <div className="books-app">
      {isLoading ? <LoadingPage /> : <AllRoutes />}
    </div>
  );
}

export default App;
