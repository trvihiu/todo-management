"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  ControlDatePicker,
  ControlInput,
  ControlTextarea,
} from "@/components/form"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui"
import { formatISO } from "date-fns"
import { useAppDispatch } from "@/hooks"
import { addTodo } from "../slices"
import { useRouter } from "next/navigation"

const FormSchema = z
  .object({
    title: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    startDate: z
      .string()
      .datetime({ offset: true })
      .transform((val) => val.replace(/T.*\+/, "T00:00:00+")),
    dueDate: z
      .string()
      .datetime({ offset: true })
      .transform((val) => {
        return val.replace(/T.*\+/, "T23:59:59+")
      }),
  })
  .refine(
    (data) => {
      return data.dueDate.localeCompare(data.startDate) >= 0
    },
    {
      message: "Start date is not great than due date",
      path: ["startDate"],
    }
  )

type FormValues = z.infer<typeof FormSchema>

export const AddTodoForm = () => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      startDate: formatISO(new Date()),
      dueDate: formatISO(new Date()),
    },
    resolver: zodResolver(FormSchema),
  })
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(addTodo(data))
    router.push("/")
    reset()
  }
  const onError: SubmitErrorHandler<FormValues> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={"p-4"}>
      <ControlInput control={control} name="title" rules={{ required: true }} />
      <ControlTextarea
        control={control}
        name="description"
        rules={{ required: true }}
      />
      <ControlDatePicker
        name={"startDate"}
        label={"START DATE"}
        control={control}
      />
      <ControlDatePicker
        name={"dueDate"}
        label={"DUE DATE"}
        control={control}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
