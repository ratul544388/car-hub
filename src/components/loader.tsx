import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({ className }: { className?: string }) => {
  return <Loader2 className={cn("text-primary animate-spin h-10 w-10", className)} />;
};

export default Loader;
