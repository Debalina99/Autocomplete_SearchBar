import React, { useState, useEffect } from "react";
import "../App.css";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
const [cache,setCache]=useState({});

  useEffect(() => {
    if(cache[input]){
        console.log("cache returned", input);
        setResults(cache[input]);
        return;
    }
    const delayDebounce = setTimeout(() => {
      console.log("Api call", input );
      fetch("https://dummyjson.com/recipes/search?q=" + input)
        .then((res) => res.json())
        .then((data) => {setResults(data?.recipes);
            setCache(prev=> ({ ...prev, [input]: data?.recipes }))
    }
);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [input]);

  return (
    <div>
      <h3>Autocomplete Search Bar</h3>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
      </div>
      {showResults && (
        <div className="results-conteainer">
          {results.map((p) => (
            <span className="result" key={p.id}>
              {p.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
