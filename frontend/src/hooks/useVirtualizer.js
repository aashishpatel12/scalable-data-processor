import { useState, useMemo, useEffect } from "react";

const useVirtualizer = ({
  itemCount,
  itemHeight,
  containerHeight,
  scrollTop,
}) => {
  const [scrollPosition, setScrollPosition] = useState(scrollTop);

  useEffect(() => {
    setScrollPosition(scrollTop);
  }, [scrollTop]);

  const { virtualItems, totalHeight, startIndex } = useMemo(() => {
    const totalHeight = itemCount * itemHeight;

    // Calculate visible range
    const startIndex = Math.max(0, Math.floor(scrollPosition / itemHeight));
    const endIndex = Math.min(
      itemCount - 1,
      Math.floor((scrollPosition + containerHeight) / itemHeight),
    );

    // Add buffer
    const buffer = 5;
    const bufferedStartIndex = Math.max(0, startIndex - buffer);
    const bufferedEndIndex = Math.min(itemCount - 1, endIndex + buffer);

    const virtualItems = [];
    for (let i = bufferedStartIndex; i <= bufferedEndIndex; i++) {
      virtualItems.push({
        index: i,
        offsetTop: i * itemHeight,
      });
    }

    return { virtualItems, totalHeight, startIndex: bufferedStartIndex };
  }, [itemCount, itemHeight, containerHeight, scrollPosition]);

  return { virtualItems, totalHeight, startIndex };
};

export default useVirtualizer;
