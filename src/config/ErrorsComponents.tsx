// errorComponents.ts
import { Errors } from "../components";

interface ErrorProps {
  message?: string;
}

export const ErrorComponentsRegistry: Record<string, React.FC<ErrorProps>> = {
  default: ({ message }) => <Errors>{message}</Errors>
};
