"use client";
import { createAxoios } from "@/utils/fetching";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

export default function Page() {
  const [newProduct, setNewProduct] = useState();
  const postProduct = async (body) => {
    try {
      await createAxoios(body);
      toast.success("Producto creado!");
    } catch (error) {
      console.error(error);
    }
  };
  const createProduct = async (e) => {
    setNewProduct(e);
    postProduct(newProduct);
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required").positive(),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.string().url("Invalid image URL").required("Image is required"),
  });
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col w-[400px] max-w-full h-auto p-4 sm:p-10 justify-center items-center bg-gray-100 rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">Crear producto</h1>
        <Formik
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: "",
            image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            createProduct(values);
          }}
        >
          <Form className="flex flex-col h-[600px] items-center justify-evenly w-full">
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
              Create
            </button>
          </Form>
        </Formik>
        <Toaster position="buttom-right" reverseOrder={false} />
      </div>
    </div>
  );
}
