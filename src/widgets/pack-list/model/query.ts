import { useQuery } from "@tanstack/react-query";

import { queryKey } from "@/src/shared/lib/query-key";
import { getPack } from "@/src/widgets/pack-list/model/api";

export default function useGetPack() {
  return useQuery({
    queryFn: async () => await getPack(),
    queryKey: queryKey("pack"),
  });
}
