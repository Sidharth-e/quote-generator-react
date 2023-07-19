import React, { useState, useEffect,useCallback ,useMemo} from "react";
import axios from "axios";
import "./styles.scss";
import Loader from "./loader/loader";
import Pen from "../asset/pen.svg";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [category, setCategory] = useState("random");
  const [clipboard, setClipboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const categories = useMemo(()=>[
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communications",
    "computers",
    "cool",
    "courage",
    "dad",
    "dating",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
    "equality",
    "experience",
    "failure",
    "faith",
    "family",
    "famous",
    "fear",
    "fitness",
    "food",
    "forgiveness",
    "freedom",
    "friendship",
    "funny",
    "future",
    "god",
    "good",
    "government",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "home",
    "hope",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "jealousy",
    "knowledge",
    "leadership",
    "learning",
    "legal",
    "life",
    "love",
    "marriage",
    "medical",
    "men",
    "mom",
    "money",
    "morning",
    "movies",
    "success",
  ],[]);


  const fetchQuote = useCallback(() => {
    setIsLoading(true);
    const selectedCategory =
      category === "random"
        ? categories[Math.floor(Math.random() * categories.length)]
        : category;
    const url = `https://api.api-ninjas.com/v1/quotes?category=${selectedCategory}`;

    axios
      .get(url, {
        headers: {
          "X-Api-Key": process.env.REACT_APP_API,
        },
      })
      .then((response) => {
        const data = response.data;
        setQuote(data[0]);
        setClipboard(false);
        console.log(data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Request failed:", error);
        setIsLoading(false);
      });
  }, [category,categories]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCopyToClipboard = () => {
    const textToCopy = `"${quote.quote}" - ${quote.author}`;
    navigator.clipboard.writeText(textToCopy);
    setClipboard(true);
  };

  const handleGenerateQuote = () => {
    fetchQuote();
    setClipboard(false); // Reset the clipboard state when generating a new quote.
  };



  return (
    <div className="container">
      <h2>QuoteGenerator</h2>
      <select id="category" value={category} onChange={handleCategoryChange}>
        <option value="random">Random</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button className="generate-button" onClick={handleGenerateQuote}>
        Generate More
      </button>
      <h3>Category: {category}</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="quote-box">
          <button
            className="quote-box__copy-button"
            onClick={handleCopyToClipboard}
          >
            {clipboard ? "✓ Copied" : "Copy"}
          </button>
          <div className="quote-box__message">
            <p>"{quote.quote}"</p>
            <p>
              <img className="pen" src={Pen} alt="pen" />
              {quote.author}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;
