import { createContext } from "react";
import { BasicComponentProps } from "./Provider";

export interface IContext {
  show: <T>(
    props: Omit<T, "open" | "onClose" | "onCancel" | "onConfirm">,
    option: "confirm" | "modal" | "alert"
  ) => void | Promise<boolean>;
  remove?: (basic: BasicComponentProps) => void;
  removeAll?: () => void;
}

const Context = createContext<IContext>({} as any);

export default Context;
