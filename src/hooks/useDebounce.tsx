import { useEffect, useState } from "react";

// tao debound de search
// tao query param cho tung truong hop
// 1: mac dinh la search ""  va selection "all"  -> ?selection="all"&search="null"
// 2: chi chon search:  search "giatribatkhi"  va selection "all"  -> ?selection="all"&search="giatribatkhi"
// 3: chi chon selection:  search ""  va selection "new"  -> ?selection="new"&search="null"
// 4: chon ca 2:  search "giatribatkhi"  va selection "new"  -> ?selection="all"&search="new"

const useDebounce  = (search:string, delay:number) => {
  const [value, setValue] = useState<string>(search);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(search);
    }, delay);
    return () => clearTimeout(timeout);
  }, [search, delay]);
  return value;
};

export default useDebounce;
