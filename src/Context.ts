import { createContext } from "react";
import { BasicComponentProps } from "./Provider";

export interface IContext {
  show: <T>(
    props: Omit<T, "open" | "onClose" | "onCancel" | "onConfirm">,
    option: "confirm" | "modal" | "alert",
    key?: string
  ) => void | Promise<boolean>;
  remove: (key: string) => void;
  removeAll: () => void;
}

const Context = createContext<IContext>({} as any);

export default Context;
