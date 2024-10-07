import { AllRoutes } from "./pages/Routes";
import { LoadingPage } from "./pages/LoadingPage";

import { useAuthors } from "./context/authors";
import { useBooks } from "./context/books";

import "./App.css";
import "./styles/global.scss";

function App() {
  const { authorLoading } = useAuthors();
  const { booksLoading } = useBooks();

  const isLoading = authorLoading || booksLoading;
  return (
    <div className="books-app">
      {isLoading ? <LoadingPage /> : <AllRoutes />}
    </div>
  );
}

export default App;
