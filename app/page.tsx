"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {

  const key: string = "https://api.themoviedb.org/3";
  const [searchInput, setSearchInput] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async ()=>{
    .then

    }
  },[])

  const changeSearchInput = (newValue: string) => {
    setSearchInput(newValue);
    console.log(searchInput);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black relative">
      <div className="fixed top-0 flex flex-row justify-between w-full px-20 py-9">
        <div>Movie Z</div>
        <div className="flex flex-row gap-5">
          <p>Genre</p>
          <input
            placeholder="Search.."
            onChange={(e) => {
              changeSearchInput(e.target.value);
            }}
          />
        </div>

        <button>Dark mode</button>
      </div>
    </div>
  );
}
