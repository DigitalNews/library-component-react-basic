import { FunctionComponent, useContext, useMemo } from "react";
import DefaultContext from "./Context";
import { BasicComponentProps } from "./Provider";

const useBasic = <A>(
  template: FunctionComponent<A>,
  type: "confirm" | "modal" | "alert"
): {
  show: (
    props: Omit<A, "open" | "onClose" | "onCancel" | "onConfirm">
  ) => void | Promise<boolean>;
  remove?: (alert: BasicComponentProps) => void;
  removeAll?: () => void;
} => {
  const basicContext = useContext(DefaultContext);

  const basic = useMemo(() => {
    return basicContext;
  }, [basicContext]);

  return {
    show: (props: Omit<A, "open" | "onClose" | "onCancel" | "onConfirm">) =>
      basic.show(props, type, template),
    remove: basic.remove,
    removeAll: basic.removeAll,
  };
};

// const hola = useBasic("confirm")
// hola.show({})

export default useBasic;
