import { useQuery } from "@tanstack/react-query";

import { queryKey } from "@/src/shared/lib/query-key";
import { getMessage } from "@/src/shared/query/chat";

export default function useGetAllMessage() {
  return useQuery({
    queryFn: async () => await getMessage(),
    queryKey: queryKey("allMessage"),
  });
}
