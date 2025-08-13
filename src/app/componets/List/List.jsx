import React from "react";
import { redirect } from "next/navigation";


export default function List({params}) {
    let editProduct = (id) => {
       return redirect(`/${id}}`)
    }
    return (
        <>
            {params?.map((product) => {
                console.log(product)
                return (
                    <ul className="w-[700px] flex gap-2" key={product.id}>
                        <li className="flex-none"><img className="w-[50px] h-[50px]" src={product.image} alt="" /></li>
                        <li className="flex-1">{product.title}</li>
                        <li>{product.price}</li>
                        <li>{product.category}</li>
                        <li>
                            <button onClick={() => editProduct(product.id)}>
                                <img className="w-[30px] h-[30px]" src={"/edit.svg"} alt="" />
                            </button>
                            <button>
                                <img className="w-[30px] h-[30px]" src={"/delete.svg"} alt="" />
                            </button>
                        </li>
                    </ul>
                )
            })}
        </>
    )
}