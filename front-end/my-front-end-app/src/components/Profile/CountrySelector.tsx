import React, { useState, useEffect } from "react";

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  cca3: string; // ISO 3166-1 alpha-3 code
}

const CountrySelector: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();

        // Sort countries alphabetically by common name
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div id="country-selector">
      <select
        id="countries"
        value={selectedCountry}
        onChange={handleChange}
        className="flex-1 w-2/3 p-[3px]"
      >
        <option value="">Choose a country</option>
        {countries.map((country) => (
          <option key={country.cca3} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
