import { createContext } from "react";
import { BasicComponentProps } from "./Provider";

export interface IContext {
  show?: (
    props: any,
    option: "confirm" | "modal" | "alert"
  ) => void | Promise<boolean>;
  remove?: (basic: BasicComponentProps) => void;
  removeAll?: () => void;
}

const Context = createContext<IContext>({});

export default Context;
