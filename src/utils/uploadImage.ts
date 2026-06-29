import { supabase } from "../supabaseClient";

export const uploadImage = async (file?: File) => {
  try {
    if (!file) {
      throw new Error("Vous devez selectionner une image a telecharger.");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = fileName;

    await supabase.storage.from("images").upload(filePath, file);

    return { filePath, fileName };
  } catch (error) {
    alert(error);
  }
};
