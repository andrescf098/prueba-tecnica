"use client";
import React, { useEffect, useState } from "react";
import { getAxios } from "@/utils/fetching";
import List from "@/app/componets/List/List";
import Search from "@/app/componets/Search/Search";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async function () {
      try {
        let data = await getAxios();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <Search />
      <List params={products} />
    </div>
  );
}
