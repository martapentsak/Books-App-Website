import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx'

import { AuthorProvider } from './context/authors.tsx';
import { BooksProvider } from './context/books.tsx';

import { composeProviders } from './utils/composeProviders.tsx';

const providers = [BrowserRouter, AuthorProvider, BooksProvider];

const CombinedProviders = composeProviders(providers);

createRoot(document.getElementById('root')!).render(
    <CombinedProviders>
    <App />
  </CombinedProviders>
)
