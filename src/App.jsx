import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    setValue(value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  console.log("no of filtered countries is:", filteredCountries.length);

  const countriesToShow = () => {
    if (filteredCountries.length === countries.length) {
      return;
    } else if (filteredCountries.length >= 10) {
      return <p>Too many matches, specify another filter.</p>;
    } else if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca2}>{country.name.common}</li>
          ))}
        </ul>
      );
    } else if (filteredCountries.length === 1) {
      return <p>Country is {filteredCountries[0].name.common}</p>;
    } else {
      return <p>There is no match</p>;
    }
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {countriesToShow()}
    </div>
  );
};

export default App;
