import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';

const App = () => {
  return (
    // Wrap the Header component in the App component. Fragment is used to wrap multiple elements without adding extra nodes to the DOM.
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to My Little Shop Charlotte</h1>
        </Container>
      </main>
    </>
  )
}

export default App