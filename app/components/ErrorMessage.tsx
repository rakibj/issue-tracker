import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <>
      <Text className="max-h-3 text-red-500" as="p">
        {children}
      </Text>
    </>
  );
};

export default ErrorMessage;
