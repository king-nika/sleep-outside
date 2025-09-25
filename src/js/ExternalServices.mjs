const baseUrl = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor() {}
  async getData(category) {
    const response = await fetch(`${baseUrl}products/search/${category}`);
    const data = await convertToJson(response);

    return data.Result;
  }
  async findProductById(id, category) {
    const products = await this.getData(category);
    return products.find((item) => item.Id === id);
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    // return await fetch(`${baseUrl}checkout/`, options).then(convertToJson);

    const fakeRes = new Response(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
    return await convertToJson(fakeRes);
  }
}
