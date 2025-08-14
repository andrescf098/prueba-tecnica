"use client";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAxiosById, putAxios } from "@/utils/fetching";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const params = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  async function getProduct() {
    let data = await getAxiosById(params.id);
    setProduct({
      title: data.title || "",
      price: data.price || "",
      description: data.description || "",
      category: data.category || "",
      image: data.image || "",
    });
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required").positive(),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.string().url("Invalid image URL").required("Image is required"),
  });

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col w-[400px] h-auto p-10 justify-center items-center bg-gray-100 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Editar producto</h1>
      <Formik
        initialValues={{
          title: product.title || "",
          price: product.price || "",
          description: product.description || "",
          category: product.category || "",
          image: product.image || "",
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (e) => {
          setProduct((prevValues) => ({
            ...prevValues,
            ...e,
          }));
          try {
            await putAxios(params.id, e);
            toast.success("Producto editado!");
          } catch (error) {
            toast.error("Error al editar producto");
          }
        }}
      >
        <Form className="flex flex-col h-[600px] items-center justify-evenly">
          <section className="flex flex-col gap-2 items-center">
            <div className="flex flex-col gap-1 justify-around">
              <label htmlFor="title">Title</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="title"
                type="text"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1 justify-around">
              <label>Price</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="price"
                type="text"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1 justify-around">
              <label htmlFor="">Description</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="description"
                type="text"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1 justify-around">
              <label htmlFor="">Category</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="category"
                type="text"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1 justify-around">
              <label htmlFor="">Image</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="image"
                type="text"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </section>
          <button
            className="w-[300px] mt-10 bg-gray-200 hover:bg-gray-300 transition-all duration-300 rounded-sm"
            type="submit"
          >
            Edit
          </button>
        </Form>
      </Formik>
      <Toaster position="buttom-right" reverseOrder={false} />
    </div>
  );
}
