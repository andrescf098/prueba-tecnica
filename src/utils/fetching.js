import axios from "axios";

let URL = "https://fakestoreapi.com/products";

export async function getAxios() {
  try {
    let response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error({
      msg: error,
    });
  }
}
export async function getAxiosById(id) {
  try {
    let response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error({
      msg: error,
    });
  }
}
export async function createAxoios(body) {
  try {
    await axios.post(URL, body);
  } catch (error) {
    console.error({
      msg: error,
    });
  }
}
export async function putAxios(id, body) {
  try {
    let res = await axios.put(`${URL}/${id}`, body);
    return res.data;
  } catch (error) {
    console.error({
      msg: error,
    });
  }
}
export async function deleteAxios(id) {
  try {
    await axios.delete(`${URL}/${id}`);
  } catch (error) {
    console.error({
      msg: error,
    });
  }
}
