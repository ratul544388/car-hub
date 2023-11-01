"use client";
import { CarProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { getCarImage } from "@/actions/get-car-image";
import CarDetailsModal from "./modals/car-details-modal";

interface CarCardProps {
  car: CarProps;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl bg-accent">
      <h1 className="font-semibold">
        {car.make} {car.model}
      </h1>
      <div className="flex w-fit items-center relative pl-3 pr-8">
        <p className="absolute -top-1 left-0">$</p>
        <h1 className="font-extrabold text-3xl">{car.city_mpg}</h1>
        <p className="absolute -bottom-1 text-muted-foreground right-0">/day</p>
      </div>
      <Image
        src={getCarImage(car)}
        alt={car.model}
        height={350}
        width={350}
        className="object-contain mx-auto"
      />
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-0.5">
          <Image
            src="/steering-wheel.svg"
            alt="Steering wheel"
            width={20}
            height={20}
          />
          <p className="text-muted-foreground">
            {car.transmission === "a" ? "Autometic" : "Menual"}
          </p>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Image src="/tire.svg" alt="Steering wheel" width={20} height={20} />
          <p className="text-muted-foreground">{car.drive.toUpperCase()}</p>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Image src="/gas.svg" alt="Steering wheel" width={20} height={20} />
          <p className="text-muted-foreground">{car.city_mpg}MPG</p>
        </div>
      </div>
      <Button onClick={() => setIsModalOpen(true)} className="rounded-full">
        View Details
      </Button>
      <CarDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
