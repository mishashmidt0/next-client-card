import { ROOT_URL } from "@/src/shared/const/api-const";
import { type ReqPack } from "@/src/widgets/pack-list/model/type";

export async function getPack(): Promise<ReqPack[]> {
  const res = await fetch(`${ROOT_URL.api}/pack`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
