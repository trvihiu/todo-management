"use client"

import * as React from "react"
import { format, formatISO, parseISO } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UseControllerProps, useController } from "react-hook-form"
import { DEFAULT_DATE_FORMAT } from "@/utils"
import { Label } from "../ui"

type ControlDatePickerProps = {
  label?: string
} & UseControllerProps<any>

export function ControlDatePicker({
  control,
  name,
  label = "",
}: ControlDatePickerProps) {
  const inputId = React.useId()
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (date?: Date) => {
    if (date) onChange(formatISO(date))
  }

  const message = error?.message ?? ""

  return (
    <div className={"flex flex-col gap-3 my-4"}>
      <Label htmlFor={inputId}>{label ? label : name.toUpperCase()}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(parseISO(value), DEFAULT_DATE_FORMAT)
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={parseISO(value)}
            onSelect={handleChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <p className={"text-destructive italic h-6"}>{message}</p>
    </div>
  )
}
