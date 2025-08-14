"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function List({ params }) {
  const router = useRouter();
  let editProduct = (id) => {
    return router.push(`/${id}`);
  };
  return (
    <div className="flex flex-col items-center p-[20px]">
      <ul className="w-[700px] flex items-center gap-2 border-b-2 border-gray-400 py-2 font-semibold bg-gray-100">
        <li className="flex-none w-[50px] text-center">Imagen</li>
        <li className="flex-[4] text-center">Título</li>
        <li className="flex-[1] text-center">Precio</li>
        <li className="flex-[2] text-center">Categoría</li>
        <li className="flex-[1] text-center">Acciones</li>
      </ul>
      {params?.map((product) => {
        return (
          <ul
            className="w-[700px] flex items-center gap-2 border-b border-gray-200 py-2"
            key={product.id}
          >
            <li className="flex-none w-[50px]">
              <img
                className="w-[50px] h-[50px] object-contain"
                src={product.image}
                alt=""
              />
            </li>
            <li className="flex-[4] truncate">{product.title}</li>
            <li className="flex-[1] text-center">${product.price}</li>
            <li className="flex-[2] text-center capitalize">
              {product.category}
            </li>

            <li className="flex gap-2">
              <button onClick={() => editProduct(product.id)}>
                <img
                  className="w-[30px] h-[30px] cursor-pointer hover:opacity-70 transition-all duration-300"
                  src={"/edit.svg"}
                  alt=""
                />
              </button>
              <button>
                <img
                  className="w-[30px] h-[30px] cursor-pointer hover:opacity-70 transition-all duration-300"
                  src={"/delete.svg"}
                  alt=""
                />
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
