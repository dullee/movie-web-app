"use client ";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import SearchBar from "./searchBar";

export default function Header() {
  return (
    <div className="fixed top-0 flex flex-row text-black bg-white justify-between w-full px-20 pt-5 pb-9 z-10">
      <Link href="/">
        <div className="text-[#4338CA] font-bold italic font-inter">Movie Z</div>
      </Link>

      <div className="flex flex-row gap-5 relative">
        <p className="border p-2 cursor-pointer">Genre</p>
        <SearchBar />
      </div>

      <button className="cursor-pointer border">Dark mode</button>
    </div>
  );
}
