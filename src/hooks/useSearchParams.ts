"use client";

import { useSearchParams as useNextSearchParams, useRouter, usePathname } from "next/navigation";

export function useSearchParams() {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (newParams: Record<string, string | number | undefined> | URLSearchParams) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    
    if (newParams instanceof URLSearchParams) {
      newParams.forEach((value, key) => {
        nextParams.set(key, value);
      });
    } else {
      Object.keys(newParams).forEach((key) => {
        const val = newParams[key];
        if (val !== undefined && val !== null && val !== "") {
          nextParams.set(key, String(val));
        } else {
          nextParams.delete(key);
        }
      });
    }

    router.push(`${pathname}?${nextParams.toString()}`);
  };

  return [searchParams, setSearchParams] as const;
}
