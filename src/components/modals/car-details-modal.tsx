import { getCarImage } from "@/actions/get-car-image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CarProps } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface CarDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: CarProps;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  isOpen,
  onClose,
  car,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="p-5 flex flex-col gap-3 max-h-[94vh] sm:max-h-[80vh] overflow-y-auto">
        <div
          onClick={onClose}
          className="rounded-full absolute h-8 w-8 right-2 top-2 hover:opacity-90 cursor-pointer bg-accent p-2 flex items-center justify-center"
        >
          <X className="h-4 w-4" />
        </div>
        <div className="bg-primary w-full min-h-[150px] flex items-center justify-center rounded-lg">
          <Image
            src={getCarImage(car)}
            alt="image"
            height={130}
            width={180}
            className="object-contain"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-accent py-4 rounded-lg flex items-center justify-center">
            <Image
              src={getCarImage(car, "29")}
              alt="image"
              height={80}
              width={80}
            />
          </div>
          <div className="bg-accent py-4 rounded-lg flex items-center justify-center">
            <Image
              src={getCarImage(car, "33")}
              alt="image"
              height={80}
              width={80}
            />
          </div>
          <div className="bg-accent py-4 rounded-lg flex items-center justify-center">
            <Image
              src={getCarImage(car, "13")}
              alt="image"
              height={80}
              width={80}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-lg">
            {car.make} {car.model}
          </h1>
          {Object.entries(car).map(([key, value]) => (
            <div className="flex justify-between">
              <p className="text-muted-foreground">{key}</p>
              <p className="font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsModal;
