"use client"
import { UseControllerProps, useController } from "react-hook-form"
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui"
import { useId } from "react"

type ControlSelectProps = {
  label?: string
} & UseControllerProps<any>

export const ControlSelect = ({
  control,
  name,
  label = "",
}: ControlSelectProps) => {
  const inputId = useId()
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const message = error?.message ?? ""

  return (
    <div className={"flex flex-col gap-3 my-4"}>
      <Label htmlFor={inputId}>{label ? label : name.toUpperCase()}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="inprogress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
      <p className={"text-destructive italic"}>{message}</p>
    </div>
  )
}
