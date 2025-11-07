import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";

export default function AddCart({ select, OnClose }) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    if (!select) return;

    const fetchCountry = async () => {
      try {
        setLoading(true);  
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,population,currencies,flags,region,cca3,languages"
        );
        const found = res.data.find((c) => c.cca3 == select);
        setCountry(found);
        setInterval(() => {
          
          setLoading(false);  
        }, 3000);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [select]);

  if (loading)
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="w-20 h-20 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (!country) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-3xl shadow-2xl w-full max-w-lg p-6 relative overflow-auto max-h-[90vh]">
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
