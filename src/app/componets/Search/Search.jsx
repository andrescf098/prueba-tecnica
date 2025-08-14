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
    <div className="static bg-gray-200 flex w-full h-[50px] items-center justify-center gap-2 my-5 px-2 sm:h-[50px] sm:gap-2 md:gap-4 md:h-[60px] lg:h-[70px] flex-wrap sm:flex-nowrap">
      <img className="w-[25px] h-[25px]" src="/search.svg" alt="" />
      <input
        className="bg-white h-[30px] rounded-md px-2 w-[120px] sm:w-[180px] md:w-[250px] lg:w-[300px] text-sm md:text-base"
        type="text"
        value={search}
        onChange={handleInput}
        placeholder="Buscar producto..."
      />
      <select
        className="bg-white h-[30px] rounded-md px-2 w-[100px] sm:w-[140px] md:w-[180px] text-sm md:text-base"
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
        className="w-[80px] sm:w-[100px] bg-gray-100 hover:bg-gray-300 transition-all duration-300 rounded-sm h-[30px] text-xs md:text-base mt-2 sm:mt-0 flex-shrink-0"
        onClick={createProduct}
      >
        Create
      </button>
    </div>
  );
}
