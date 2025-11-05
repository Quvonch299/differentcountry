import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function AddCart({ OnClose, select }) {
  const [data, setData] = useState(null);

  const GetData = async () => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/alpha/${select}?fields=name,capital,population,currencies,flags,region`
      );
      setData(res.data[0]); // alpha endpoint array ichida bitta obyekt qaytaradi
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (select) {
      GetData();
    }
  }, [select]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 flex items-center justiqfy-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-xl relative">
        <button className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black">
          <AiOutlineClose onClick={OnClose} />
        </button>

        <section className="text-gray-600">
          <div className="flex flex-col md:flex-row items-center gap-6">
            
           <img
                src={data.flags.png}
                alt="flag"
                className="w-full h-40 object-cover"
              />

            <div>
              <h2 className="text-sm text-gray-500">Region: </h2>
              <h1 className="text-gray-900 text-2xl font-semibold mb-2"></h1>

              <p className="text-gray-700 mb-2">
                Capital:d 
              </p>

              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">
                  Population: 
                </span>
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700">
                  Add
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
