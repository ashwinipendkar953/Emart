/**
 * Converts an image file to a Base64-encoded data URL.
 * @param {File} image - The image file to convert.
 * @returns {Promise<string>} A promise that resolves to the Base64-encoded data URL of the image.
 */
export const imageToBase64 = async (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  const data = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  return data;
};

/**
 * Formats a number as Indian Rupee (INR) currency.
 * @param {number} num - The number to format.
 * @returns {string} The number formatted as INR currency.
 */
export const displayINRCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return formatter.format(num);
};

/**
 * Calculates the discount percentage given the original price and selling price.
 * @param {number} price - The original price of the product.
 * @param {number} sellingPrice - The selling price of the product.
 * @returns {string} The discount percentage, rounded to 2 decimal places.
 * @throws {Error} Throws an error if the original price is less than or equal to zero, or if the selling price is negative.
 */
export const calculateDiscount = (price, sellingPrice) => {
  if (price <= 0 || sellingPrice < 0) {
    throw new Error(
      "Price and selling price must be non-negative values, and price must be greater than zero."
    );
  }
  const discount = ((price - sellingPrice) / price) * 100;
  return discount.toFixed(0); // Returns the discount percentage rounded to 2 decimal places
};

export const calculateMinPrice = (products) => {
  return products?.reduce(
    (acc, curr) => (curr?.sellingPrice < acc ? curr?.sellingPrice : acc),
    products[0]?.sellingPrice
  );
};

export const calculateMaxPrice = (products) => {
  return products?.reduce(
    (acc, curr) => (curr?.sellingPrice > acc ? curr?.sellingPrice : acc),
    products[0]?.sellingPrice
  );
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
