import { useMemo, useRef, useState } from "react";

type FilterFn<Type> = (v: Type) => boolean;

export const useFilter = <Type>(
  data: Type[]
): [Type[], (fn: FilterFn<Type>) => void, () => void] => {
  const refData = useMemo(() => [...data], [data]);
  const [filter, setFilter] = useState([...data]);

  const reset = () => {
    setFilter(refData);
  };

  const onFilter = (fn: FilterFn<Type>) => {
    setFilter(refData.filter(fn));
  };

  return [filter, onFilter, reset];
};
