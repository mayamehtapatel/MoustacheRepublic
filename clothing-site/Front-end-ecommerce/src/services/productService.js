// get product Details
export const getProductDetails = async () => {
    const response = await fetch(
      'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product'
    );
    return response.json();
  };