"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { deleteAxios } from "@/utils/fetching";

export default function List({ params }) {
  const router = useRouter();
  const editProduct = (id) => {
    return router.push(`/${id}`);
  };
  const deleteProduct = async (id) => {
    try {
      await deleteAxios(id);
      toast.success("Producto eliminado!");
    } catch (error) {
      toast.error("Error al eliminar producto");
    }
  };
  return (
    <div className="flex flex-col items-center p-2 sm:p-4 w-full">
      <ul className="w-full max-w-[700px] flex items-center gap-1 sm:gap-2 border-b-2 border-gray-400 py-2 font-semibold bg-gray-100 text-xs sm:text-base">
        <li className="flex-none w-[40px] sm:w-[50px] text-center">Imagen</li>
        <li className="flex-[4] text-center block">Título</li>
        <li className="flex-[1] text-center">Precio</li>
        <li className="flex-[2] text-center block">Categoría</li>
        <li className="flex-[1] text-center">Acciones</li>
      </ul>
      {params?.map((product) => {
        return (
          <ul
            className="w-full max-w-[700px] flex items-center gap-1 sm:gap-2 border-b border-gray-200 py-2 text-xs sm:text-base flex-wrap"
            key={product.id}
          >
            <li className="flex-none w-[40px] sm:w-[50px]">
              <img
                className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] object-contain"
                src={product.image}
                alt=""
              />
            </li>
            <li className="flex-[4] truncate block">{product.title}</li>
            <li className="flex-[1] text-center">${product.price}</li>
            <li className="flex-[2] text-center capitalize block">
              {product.category}
            </li>
            <li className="flex gap-1 sm:gap-2">
              <button onClick={() => editProduct(product.id)}>
                <img
                  className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] cursor-pointer hover:opacity-70 transition-all duration-300"
                  src={"/edit.svg"}
                  alt=""
                />
              </button>
              <button onClick={() => deleteProduct(product.id)}>
                <img
                  className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] cursor-pointer hover:opacity-70 transition-all duration-300"
                  src={"/delete.svg"}
                  alt=""
                />
              </button>
            </li>
          </ul>
        );
      })}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
