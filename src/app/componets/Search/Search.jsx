import { redirect } from "next/navigation";

import { getCategories } from "@/utils/fetching";
import { useEffect, useState } from "react";

export default function Search({ onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [categories, setCategories] = useState(["Todas"]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(["Todas", ...data]);
    }
    fetchCategories();
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (onFilter) onFilter(value, category);
  };

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (onFilter) onFilter(search, value);
  };

  const createProduct = () => {
    return redirect(`/create`);
  };

  return (
    <div className="static bg-gray-200 flex w-full h-[50px] items-center justify-center gap-2 my-5">
      <img className="w-[25px] h-[25px]" src="/search.svg" alt="" />
      <input
        className="bg-white h-[25px] rounded-md"
        type="text"
        value={search}
        onChange={handleInput}
        placeholder="Buscar producto..."
      />
      <select
        className="bg-white h-[25px] rounded-md px-2"
        value={category}
        onChange={handleCategory}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <button
        className="absolute right-[-100px] w-[100px] bg-gray-100 hover:bg-gray-300 transition-all duration-300 rounded-sm"
        onClick={createProduct}
      >
        Create
      </button>
    </div>
  );
}
