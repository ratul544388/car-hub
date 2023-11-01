import { getCars } from "@/actions/get-cars";
import CarCard from "@/components/car-card";
import { Combobox } from "@/components/combo-box";
import ModelSearch from "@/components/model-search";
import Pagination from "@/components/pagination";
import { buttonVariants } from "@/components/ui/button";
import { fuels, manufacturers, yearsOfProduction } from "@/constant";
import { cn } from "@/lib/utils";
import { CarProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams.page as string;
  const cars = await getCars({
    manufacturer: searchParams.manufacturer || "bmw",
    fuel: searchParams.fuel as string,
    model: searchParams.model as string,
    limit: searchParams.limit || `${(Number(page) || 1) * 10}`,
    year: searchParams.year || "2023",
  });

  return (
    <main className="flex flex-col gap-3 pt-16">
      <section className="flex flex-wrap lg:flex-nowrap gap-5 w-fit mx-auto">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-4xl">
            Find, book, rent a car- quick and super easy!
          </h1>
          <p className="text-muted-foreground">
            Streamline your car rental experience with our effortless booking
            process
          </p>
          <Link href="/" className={cn(buttonVariants(), "w-fit rounded-full")}>
            Explore Cars
          </Link>
        </div>
        <Image
          src="/hero.png"
          alt="Hero"
          width={600}
          height={600}
          className="object-contain"
        />
      </section>
      <section className="flex flex-col">
        <h1 className="font-bold text-2xl">Car Catalogue</h1>
        <p className="text-muted-foreground">Explore the cars you might like</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center mt-3 gap-3">
            <Combobox
              triggerLogo="/car-logo.svg"
              placeholder="Manufacturer"
              filterKey="manufacturer"
              items={manufacturers.map((item) => {
                return {
                  label: item,
                  value: item.toLowerCase(),
                };
              })}
            />
            <ModelSearch />
          </div>
          <div className="flex items-center gap-3">
            <Combobox
              placeholder="Fuel type"
              filterKey="fuel_type"
              items={fuels.map((item) => {
                return {
                  label: item.title,
                  value: item.value,
                };
              })}
            />
            <Combobox
              placeholder="Year"
              filterKey="year"
              items={yearsOfProduction.map((item) => {
                return {
                  label: item.title,
                  value: item.value,
                };
              })}
            />
          </div>
        </div>
      </section>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cars?.map((car: CarProps, index: number) => (
          <CarCard car={car} key={index} />
        ))}
      </div>
      <Pagination page={Number(page) || 1} />
    </main>
  );
}
