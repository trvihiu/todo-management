"use client"
import { UseControllerProps, useController } from "react-hook-form"
import { Input, Label } from "../ui"
import { useId } from "react"

type ControlInputProps = {
  label?: string
} & UseControllerProps<any>

export const ControlInput = ({
  control,
  name,
  label = "",
}: ControlInputProps) => {
  const inputId = useId()
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const message = error?.message ?? ""

  return (
    <div className={"flex flex-col gap-3 my-4"}>
      <Label htmlFor={inputId}>{label ? label : name.toUpperCase()}</Label>
      <Input id={inputId} {...field} placeholder={name.toUpperCase()} />
      <p className={"text-destructive italic"}>{message}</p>
    </div>
  )
}
