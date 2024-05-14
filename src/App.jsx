import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [countryDetailes, setCountryDetailes] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (country) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then((response) => {
          setCountryDetailes(response.data);
        });
    }
  }, [country]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0].name.common);
    }
    setValue("");
  };

  const countriesToShow = () => {
    if (filteredCountries.length === countries.length) {
      return;
    } else if (filteredCountries.length >= 10) {
      return <p>Too many matches, specify another filter.</p>;
    } else if (filteredCountries.length >= 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca2}>{country.name.common}</li>
          ))}
        </ul>
      );
    } else {
      return <p>There is no match</p>;
    }
  };

  const countryDataToShow = () => {
    if (!countryDetailes) {
      return null;
    }

    const { name, capital, area, languages } = countryDetailes;

    return (
      <div>
        <h1>{name.common}</h1>
        <p>
          capital: {capital} <br /> area: {area}
        </p>
        <h2>Languages</h2>
        <ul>
          {Object.values(languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {country ? countryDataToShow() : countriesToShow()}
    </div>
  );
};

export default App;
