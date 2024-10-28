"use client";
import React, { useState } from "react";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// interface IssueForm {
//   name: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <>
      {error && (
        <Callout.Root className="text-red-500 bg-red-100 max-w-xl mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured");
            console.log(error);
          }
        })}
      >
        {errors.name && (
          <Text className="max-h-3 text-red-500" as="p">
            {errors.name.message}
          </Text>
        )}
        <TextField.Root
          placeholder="Issue Name"
          {...register("name")}
        ></TextField.Root>

        {errors.description && (
          <Text className="max-h-3 text-red-500" as="p">
            {errors.description.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issue Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </>
  );
};

export default NewIssuePage;
