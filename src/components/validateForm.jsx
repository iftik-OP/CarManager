export const validateForm = (formData, images, carCategory) => {
  const errors = {};

  if (!formData.carMake) errors.carMake = "Car make is required.";
  if (!formData.carModel) errors.carModel = "Car model is required.";

  if (!formData.year) errors.year = "Year is required.";

  if (!formData.mileage || isNaN(formData.mileage)) {
    errors.mileage = "Mileage should be a number.";
  }

  if (!formData.color) errors.color = "Color is required.";

  if (!carCategory) errors.carCategory = "Car category is required.";

  if (images.length === 0) {
    errors.images = "At least one image is required.";
  } else if (images.length > 10) {
    errors.images = "You can only upload up to 10 images.";
  }

  return errors;
};
