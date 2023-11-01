"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import queryString from "query-string";

interface PaginationProps {
  page: number;
}

const Pagination: React.FC<PaginationProps> = ({ page }) => {
  const router = useRouter();
  const [buttons, setButtons] = useState([1, 2, 3, 4, 5]);
  const pathanme = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    if (page > buttons[4]) {
      setButtons(
        buttons.map((button) => {
          return button + buttons.length;
        })
      );
    } else if (page < buttons[0]) {
      setButtons(
        buttons.map((button) => {
          return button - buttons.length;
        })
      );
    }
  }, [page]);

  const handleClick = (page: number) => {
    const currentQuery = queryString.parse(params.toString());

    const url = queryString.stringifyUrl({
      url: pathanme,
      query: {
        ...currentQuery,
        page,
      },
    });

    router.push(url, {
      scroll: false,
    });
  };

  return (
    <div className="flex py-5 items-center gap-1 w-fit ml-auto mt-5">
      <Button
        disabled={page === 1}
        onClick={() => handleClick(page - 1)}
        className="rounded-full border-gray-400"
        size="icon"
        variant="outline"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {buttons.map((button) => (
        <Button
          onClick={() => handleClick(button)}
          variant={button === page ? "default" : "outline"}
          size="icon"
          className={cn(
            "rounded-full border-gray-400",
            button === page && "border-none shadow-md shadow-purple-700"
          )}
        >
          {button}
        </Button>
      ))}
      <Button
        onClick={() => handleClick(page + 1)}
        className="rounded-full border-gray-400"
        size="icon"
        variant="outline"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
