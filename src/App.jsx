import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import AddCart from "./AddCart";

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [select, setSelect] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true); // loader state

  const getData = async function () {
    try {
      setLoading(true);  
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,capital,population,currencies,flags,region,cca3,languages"
      );
      setData(res.data);
      setInterval(() => {
        
        setLoading(false); 
      }, 3000);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    setSelect('');
  }, []);

  const OnClose = function () {
    setModal(false);
    setSelect('');
  };

  const filtered = data.filter((item) =>
    item?.name?.common?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`${dark ? "dark" : ""} min-h-screen p-6 transition-colors duration-300 
        bg-gray-100 text-gray-800 dark:text-[#f3f3f3]
        dark:bg-[linear-gradient(135deg,_#1e1b4b_0%,_#312e81_25%,_#4f46e5_50%,_#9333ea_75%,_#f43f5e_100%)]`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🌍 Countries</h1>
          <button
            onClick={() => setDark((prev) => !prev)}
            className="text-2xl outline-none"
          >
            {dark ? <FaRegMoon /> : <MdOutlineWbSunny />}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search country..."
          className="placeholder:dark:text-white w-full p-3 border rounded-lg shadow-sm mb-5 outline-none ring-2 ring-indigo-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((post) => (
              <div
                onClick={() => { setSelect(post.cca3); setModal(true); }}
                key={post.cca3}
                className="dark:bg-fuchsia-900 dark:text-black rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
              >
                <img
                  src={post.flags.png}
                  alt="flag"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{post.name.common}</h2>
                  <p className="text-sm">
                    <b>Region:</b> {post.region}
                  </p>
                  <p className="text-sm">
                    <b>Capital:</b> {post.capital ? post.capital[0] : "N/A"}
                  </p>
                  <p className="text-sm">
                    <b>People:</b> {post.population.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {modal && <AddCart select={select} OnClose={OnClose} />}
      </div>
    </div>
  );
}
