import { Todo } from "@/app/store/useTodos";
import { useFilter } from "@/hooks/useFilter";
import { useEffect, useMemo, useState } from "react";
import { debounceTime, Subject } from "rxjs";

export const useSearch = (todos: Todo[]) => {
  const [search, setSearch] = useState<string>("");
  const searchSubject = useMemo(() => new Subject<string>(), []);

  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const [filtedTodos, setFilteredTodos, reset] = useFilter<Todo>(todos);

  const tags = useMemo(
    () =>
      Array.from(new Set((todos || []).flatMap((todo) => todo?.tags || []))),
    [todos]
  );

  const formattedFilter = useMemo(() => {
    return filtedTodos.map((to) => to.id);
  }, [filtedTodos]);
  const updateTag = (tag: string) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(selectedTag.filter((t) => t !== tag));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  useEffect(() => {
    if (selectedTag.length || search) {
      if (search && !selectedTag.length) {
        setFilteredTodos((v) => {
          return v.title.toLowerCase().startsWith(search.toLowerCase());
        });
      } else if (search && selectedTag.length) {
        setFilteredTodos((v) => {
          return (
            selectedTag.some((tag) => v.tags?.includes(tag)) &&
            v.title.toLowerCase().startsWith(search.toLowerCase())
          );
        });
      } else {
        setFilteredTodos((v) => {
          return selectedTag.some((tag) => v.tags?.includes(tag));
        });
      }
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag.length, search, todos]);

  const onSearch = (value: string) => {
    searchSubject.next(value);
  };

  useEffect(() => {
    searchSubject.pipe(debounceTime(200)).subscribe((value) => {
      setSearch(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    updateTag,
    tags,
    formattedFilter,
    selectedTag,
    onSearch,
    setSelectedTag,
    search,
  };
};
