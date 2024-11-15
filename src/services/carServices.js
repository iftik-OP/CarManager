import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageToStorage = async (file) => {
  const storage = getStorage();
  const uniqueFileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `cars/${uniqueFileName}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const submitData = async (formData, carCategory, images) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error(
        "User is not authenticated. Please log in to upload a car."
      );
    }

    const userEmail = currentUser.email;

    const uploadedImageURLs = await Promise.all(
      images.map((file) => uploadImageToStorage(file))
    );

    const carRef = await addDoc(collection(db, "cars"), {
      make: formData.carMake,
      model: formData.carModel,
      year: formData.year,
      mileage: formData.mileage,
      color: formData.color,
      category: carCategory,
      images: uploadedImageURLs,
      email: userEmail,
      description: formData.description,
    });

    console.log("Car registered with ID: ", carRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to register car.");
  }
};
