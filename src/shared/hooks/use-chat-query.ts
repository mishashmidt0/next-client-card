import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { useSocket } from "@/src/widgets/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  paramKey,
  paramValue,
  apiUrl,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const res = await axios.get(apiUrl, {
      params: {
        cursor: pageParam,
        [paramKey]: paramValue,
      },
    });

    return res.data;
  };

  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage: any, allPages: any) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000,
    initialPageParam: 0,
  });
};
