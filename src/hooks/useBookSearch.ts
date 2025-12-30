import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import type { Book } from "@/utils/constants";

export function useBookSearch(list: Book[], query: string) {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  const fuse = useMemo(
    () =>
      new Fuse(list, {
        keys: ["title", "author", "genre"],
        threshold: 0.3,
      }),
    [list]
  );

  return useMemo(
    () => (debounced ? fuse.search(debounced).map((r) => r.item) : list),
    [debounced, fuse]
  );
}
