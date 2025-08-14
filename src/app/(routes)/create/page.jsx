"use client";
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [newProduct, setNewProduct] = useState();
  const postProduct = async (body) => {
    try {
      await createAxoios(body);
    } catch (error) {
      console.error(error);
    }
  };
  const createProduct = async (e) => {
    setNewProduct((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));

    postProduct(newProduct);
  };
  return (
    <div className="w-[400px] h-[400px] bg-gray-100 rounded-2xl">
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
        }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          createProduct(values);
        }}
      >
        <Form className="flex flex-col h-full items-center justify-evenly">
          <section className="flex flex-col gap-2 items-center">
            <div className="flex flex-col gap-1 justify-around">
              <label htmlFor="title">Title</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="title"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 justify-around">
              <label>Price</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="price"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 justify-around">
              <label htmlFor="">Description</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="description"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 justify-around">
              <label htmlFor="">Category</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="category"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 justify-around">
              <label htmlFor="">Image</label>
              <Field
                className="bg-white w-[300px] outline rounded-sm"
                name="image"
                type="text"
              />
            </div>
          </section>
          <button
            className="w-[300px] bg-gray-200 hover:bg-gray-300 transition-all duration-300 rounded-sm"
            type="submit"
          >
            Create
          </button>
        </Form>
      </Formik>
      <Toaster position="buttom-right" reverseOrder={false} />
    </div>
  );
}
