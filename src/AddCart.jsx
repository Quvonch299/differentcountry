import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";

export default function AddCart({ select, OnClose }) {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!select) return;

    const fetchCountry = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,population,currencies,flags,region,cca3,languages"
        );
        const found = res.data.find((c) => c.cca3 === select);
        setCountry(found);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountry();
  }, [select]);

  if (!country) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-3xl shadow-2xl w-full max-w-lg p-6 relative overflow-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={OnClose}
          className="absolute top-2 right-2 text-2xl text-gray-700 dark:text-gray-300 hover:text-red-500 transition"
        >
          <IoClose />
        </button>

        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="w-full h-56 object-cover rounded-xl shadow-md mb-6"
        />

        {/* Country Info */}
        <h2 className="text-3xl font-bold mb-4 text-center">{country.name.common}</h2>

        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p><b>Region:</b> {country.region}</p>
          <p><b>Capital:</b> {country.capital ? country.capital[0] : "N/A"}</p>
          <p><b>Population:</b> {country.population.toLocaleString()}</p>

          {country.currencies && (
            <p>
              <b>Currency:</b>{" "}
              {Object.values(country.currencies)
                .map((cur) => `${cur.name} (${cur.symbol})`)
                .join(", ")}
            </p>
          )}

          {country.languages && (
            <p>
              <b>Languages:</b> {Object.values(country.languages).join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
