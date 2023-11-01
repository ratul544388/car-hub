"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface ComboboxPorps {
  triggerLogo?: string;
  filterKey: string;
  placeholder: string;
  items: {
    label: string;
    value: string;
  }[];
}

export function Combobox({
  items,
  triggerLogo,
  filterKey,
  placeholder,
}: ComboboxPorps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSelect = ({
    value,
    currentValue,
  }: {
    value: string;
    currentValue: string;
  }) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      [filterKey]: currentValue,
    };

    if (params?.get(filterKey) === currentValue) {
      delete updatedQuery[filterKey];
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url, {
      scroll: false,
    });
    // router.refresh();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="flex items-center gap-1.5">
            {triggerLogo && (
              <Image src={triggerLogo} alt="image" height={18} width={18} />
            )}
            {value ? (
              items.find((item) => item.value === value)?.label
            ) : (
              <p className="text-muted-foreground">{placeholder}</p>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => onSelect({ value, currentValue })}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
