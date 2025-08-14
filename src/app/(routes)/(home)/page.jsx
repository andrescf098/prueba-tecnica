"use client";
import React, { useEffect, useState } from "react";
import { getAxios } from "@/utils/fetching";
import List from "@/app/componets/List/List";
import Search from "@/app/componets/Search/Search";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        let data = await getAxios();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleFilter = (text, category) => {
    let filteredList = products;
    if (text) {
      filteredList = filteredList.filter((p) =>
        p.title?.toLowerCase().includes(text.toLowerCase())
      );
    }
    if (category && category !== "Todas") {
      filteredList = filteredList.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }
    setFiltered(filteredList);
  };

  return (
    <div className="flex flex-col items-center">
      <Search onFilter={handleFilter} />
      <List params={filtered} />
    </div>
  );
}
