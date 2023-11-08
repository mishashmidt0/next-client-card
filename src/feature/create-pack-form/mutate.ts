import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { creatCard } from "@/src/feature/create-pack-form/api";

export default function useCreateCard() {
  return useMutation({
    mutationFn: async (formData: FormData) => await creatCard(formData),
    onSuccess: () => {
      toast.success("Колода создана");
    },
  });
}
