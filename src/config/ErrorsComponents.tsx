// errorComponents.ts
import { ReactNode } from "react";
import Errors from "../components/ui/Errors/Errors";

interface ErrorProps {
  message?: string;
}

export const ErrorComponentsRegistry: Record<string, React.FC<ErrorProps>> = {
  default: ({ message }) => <Errors>{message}</Errors>
};
