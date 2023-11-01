"use client";
import Image from "next/image";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";

interface ModelSearchProps {}

const ModelSearch: React.FC<ModelSearchProps> = ({}) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const currentQuery = queryString.parse(params.toString());

    const updatedQuery = {
      ...currentQuery,
      model: value,
    };

    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (!value) {
      const currentQuery: any = queryString.parse(params.toString());
      delete currentQuery.model;
      const url = queryString.stringifyUrl(
        {
          url: pathname,
          query: currentQuery,
        },
        {
          skipEmptyString: true,
          skipNull: true,
        }
      );
      router.push(url);
    }
  }, [value, pathname, router, params]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border rounded-md px-3"
    >
      <Image src="/model-icon.png" alt="modal" height={18} width={18} />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-none"
        placeholder="Search model"
      />
      <SearchIcon className="cursor-pointer" onClick={handleSubmit} />
    </form>
  );
};

export default ModelSearch;
