"use client"
import { useEffect, useState } from "react"
import { Formik, Field, Form } from "formik";
import { getAxiosById } from "@/utils/fetching";
import { useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
    const params = useParams()
    const [product, setProduct] = useState()
    const [editedProduct, setEditedProduct] = useState()
    async function getProduct () {
        let data = await getAxiosById(params.id)
        setProduct(data)
    }
    const editProduct = (e) => {
        setEditedProduct(prevValues => ({
            ...prevValues, [e.target.name]: e.target.value
        }))
        toast.success('Producto editado!')
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <div className="w-[400px] h-[400px] bg-gray-100 rounded-2xl">
            <Formik
                initialValues={{ title: product?.title, price: product?.price, description: product?.description, category: product?.category, image: product?.image }}
                onSubmit={async (e) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                setEditedProduct(prevValues => ({
                    ...prevValues, [e.target.name]: e.target.value
                }))
                toast.success('Producto editado!')
            }}
        >
            <Form className="flex flex-col h-full items-center justify-evenly">
            <section className="flex flex-col gap-2 items-center">
                <div className="flex flex-col gap-1 justify-around">
                    <label htmlFor="title">Title</label>
                    <Field className="bg-white w-[300px] outline rounded-sm" name="title" type="text" />
                </div>
                <div className="flex flex-col gap-1 justify-around">
                    <label>Price</label>
                    <Field className="bg-white w-[300px] outline rounded-sm" name="price" type="text" />
                </div>
                <div className="flex flex-col gap-1 justify-around">
                    <label htmlFor="">Description</label>
                    <Field className="bg-white w-[300px] outline rounded-sm" name="description" type="text" />
                </div>
                <div className="flex flex-col gap-1 justify-around">
                    <label htmlFor="">Category</label>
                    <Field className="bg-white w-[300px] outline rounded-sm" name="category" type="text" />
                </div>
                <div className="flex flex-col gap-1 justify-around">
                    <label htmlFor="">Image</label>
                    <Field className="bg-white w-[300px] outline rounded-sm" name="image" type="text" />
                </div>
            </section>
                <button className="w-[300px] bg-gray-200 hover:bg-gray-300 transition-all duration-300 rounded-sm" type="submit" onClick={(e) => editProduct(e)}>Edit</button>
            </Form>
        </Formik>
            <Toaster
                position="buttom-right"
                reverseOrder={false}
            />
      </div>
    )
}