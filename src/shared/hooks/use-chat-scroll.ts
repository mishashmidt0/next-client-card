import { useState, type RefObject, useEffect } from "react";

interface IChatScrollProps {
  chatRef: RefObject<HTMLDivElement>;
  bottomRef: RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
}

export const useChatScroll = ({
  chatRef,
  bottomRef,
  count,
  shouldLoadMore,
  loadMore,
}: IChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const topDiv = chatRef?.current;

    const handlerScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      if (scrollTop === 0 && shouldLoadMore && !hasInitialized) {
        loadMore();
        setHasInitialized(true);
      }
    };

    topDiv?.addEventListener("scroll", handlerScroll);

    return () => {
      topDiv?.removeEventListener("scroll", handlerScroll);
    };
  }, [chatRef, hasInitialized, loadMore, shouldLoadMore]);

  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef?.current;
    const shouldAotuoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);

        return true;
      }

      if (!topDiv) {
        return false;
      }
      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

      return distanceFromBottom <= 100;
    };
  }, []);

  return {};
};
