import React, { useState } from "react";
import "./QuotesApp.css";

const QuotesApp = () => {
  const [quote, setQuote] = useState({
    text: "Ask not what your country can do for you. Ask what you can do for your country",
    author: "John Kennedy",
  });
  const [showFav, setShowFav] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const fetchNewQuote = async () => {
    const url = "https://api.quotable.io/random";
    const response = await fetch(url);
    const data = await response.json();
    setQuote({
      text: data.content,
      author: data.author,
    });
  };

  const toggleFav = () => {
    setShowFav(!showFav);
  };

  const addToFavorites = () => {
    const isAlreadyInFavorites = favorites.some(
      (fav) => fav.text === quote.text && fav.author === quote.author
    );
    if (!isAlreadyInFavorites) {
      setFavorites([...favorites, quote]);
    }
  };

  return (
    <div className="container">
      <div className="quotes-app">
        <h1 className="app-heading">Quote.</h1>
        <i className="bx bxs-heart fav-icon" onClick={toggleFav}></i>

        <div className="quote">
          <i className="bx bxs-quote-alt-left left-quote"></i>
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">{quote.author}</p>
          <i className="bx bxs-quote-alt-right right-quote"></i>
        </div>

        <div className="circles">
          <div className="circle-1"></div>

          <div className="circle-2"></div>

          <div className="circle-3"></div>

          <div className="circle-4"></div>
        </div>

        <div className="buttons">
          <button className="btn btn-new" onClick={fetchNewQuote}>
            New Quote
          </button>
          <button className="btn btn-fav" onClick={addToFavorites}>
            Add to Favorites
          </button>
        </div>

        {showFav && (
          <div className="favorites">
            <button className="btn-close" onClick={toggleFav}>
              <i className="bx bx-x"></i>
            </button>

            {favorites.map((favQuote, index) => (
              <div className="fav-quotes" key={index}>
                <div className="fav-quote-delete">
                  <i
                    className="bx bx-x-circle"
                    onClick={() => {
                      const updatedFavorites = favorites.filter(
                        (item, i) => i !== index
                      );
                      setFavorites(updatedFavorites);
                    }}
                  ></i>
                </div>

                <div className="fav-quotes-content">
                  <div className="fav-quote-text">{favQuote.text}</div>

                  <div className="fav-quote-author">{favQuote.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesApp;
