"use client";
import React, { useState } from "react";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IssueForm {
  name: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit, watch, control } = useForm<IssueForm>();
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
        <TextField.Root
          placeholder="Issue Name"
          {...register("name")}
        ></TextField.Root>
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
