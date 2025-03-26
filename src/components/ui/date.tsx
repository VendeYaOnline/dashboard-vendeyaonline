"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type Inputs = {
  price: string;
  quantityProducts: string;
  type: string;
  status: string;
  date: Date;
};

interface Pros {
  setValue: UseFormSetValue<Inputs>;
  disabled?: boolean;
  value?: Date;
}

export function DatePicker({ value, setValue, disabled = false }: Pros) {
  const [date, setDate] = useState<Date | undefined>(value);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const change = (value: boolean) => {
    setIsCalendarOpen(value);
  };

  const onClose = () => {
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  return (
    <Popover open={isCalendarOpen} onOpenChange={change}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal p-5 focus:ring-1 focus:ring-blue-600",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-[#9ca3af]" />
          {date ? (
            format(date, "PPP", { locale: es })
          ) : (
            <span className="text-[#9ca3af]">Fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          locale={es}
          mode="single"
          selected={date}
          onSelect={(date) => {
            if (date) {
              setDate(date), onClose();
              setValue("date", date);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
