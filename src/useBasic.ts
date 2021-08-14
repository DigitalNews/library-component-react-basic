import { useContext, useMemo } from "react";
import DefaultContext from "./Context";

const useBasic = <A>(
  type: "confirm" | "modal" | "alert"
): {
  show: (
    props: Omit<A, "open" | "onClose" | "onCancel" | "onConfirm">,
    key?: string
  ) => void | Promise<boolean>;
  remove: (key: string) => void;
  removeAll: () => void;
} => {
  const basicContext = useContext(DefaultContext);

  const basic = useMemo(() => {
    return basicContext;
  }, [basicContext]);

  return {
    show: (
      props: Omit<A, "open" | "onClose" | "onCancel" | "onConfirm">,
      key?: string
    ) => basic.show(props, type, key),
    remove: (key: string) => basic.remove({ key: key }),
    removeAll: basic.removeAll,
  };
};

export default useBasic;
