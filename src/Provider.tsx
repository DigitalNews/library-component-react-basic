import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback,
  FunctionComponent,
} from "react";
import { createPortal } from "react-dom";
import DefaultContext, { IContext } from "./Context";
// import { TransitionGroup } from 'react-transition-group';

interface IProviderProps {
  context?: React.Context<IContext>;
  templateModal: FunctionComponent<any>;
  templateConfirm: FunctionComponent<any>;
  templateAlert: FunctionComponent<any>;
  children: React.ReactNode;
}

export interface BasicComponentProps {
  key: string;
  option: "modal" | "confirm" | "alert";
  props: any;
}

const Provider = ({
  context: Context = DefaultContext,
  templateAlert: TemplateAlert,
  templateConfirm: TemplateConfirm,
  templateModal: TemplateModal,
  children,
}: IProviderProps) => {
  const root = useRef<HTMLDivElement | null>(null);
  const basicContext = useRef<any>(null);
  const timersId = useRef([]);
  const [basic, setBasic] = useState<Array<BasicComponentProps>>([]);

  const [resolveReject, setResolveReject] = useState<any[]>([]);
  const [resolve] = resolveReject;

  useEffect(() => {
    root.current = document.createElement("div");
    root.current.id = "__react-basic__";
    document.body.appendChild(root.current);
    const timersIdRef = timersId.current;

    return () => {
      timersIdRef.forEach(clearTimeout);
      if (root.current) document.body.removeChild(root.current);
    };
  }, []);

  const remove = useCallback((basic: BasicComponentProps) => {
    setResolveReject([]);
    setBasic((currentAlerts) => {
      const lengthBeforeRemove = currentAlerts.length;
      const filteredAlerts = currentAlerts.filter((a) => a.key !== basic.key);

      if (lengthBeforeRemove > filteredAlerts.length && basic.props.onClose) {
        basic.props.onClose();
      }

      return filteredAlerts;
    });
  }, []);

  const handleCancel = useCallback(
    (basic: BasicComponentProps) => {
      // console.log('cancelando...', resolveReject);
      resolve(false);
      remove(basic);
    },
    [resolve, remove]
  );

  const handleConfirm = useCallback(
    (basic: BasicComponentProps) => {
      resolve(true);
      remove(basic);
    },
    [resolve, remove]
  );

  const removeAll = useCallback(() => {
    basicContext?.current.basic.forEach(remove);
  }, [remove]);

  const show = useCallback(
    (props: any, option: "confirm" | "modal" | "alert") => {
      const key = Math.random().toString(36).substr(2, 9);

      // console.log('bug props', props);
      const basic = {
        key,
        option,
        props: {
          ...props,
          open: true,
          onClose: () => remove(basic),
        },
      };

      if (option === "confirm") {
        return new Promise((resolve, reject) => {
          setResolveReject([resolve, reject]);
          setBasic((state) =>
            state.concat({
              ...basic,
              props: { ...props },
            })
          );
        });
      }

      setBasic((state) => state.concat(basic));
      return basic;
    },
    [remove]
  );

  basicContext.current = {
    basic,
    show,
    remove,
    removeAll,
  };

  return (
    <Context.Provider value={basicContext.current}>
      {children}
      {root.current &&
        createPortal(
          <Fragment>
            {basic.map((e) => {
              if (e.option === "alert") {
                return (
                  <div
                    key={e.key + "1"}
                    style={{
                      position: "fixed",
                      top: 0,
                      right: 0,
                      width: "100%",
                      zIndex: 3000,
                    }}
                  >
                    {basic
                      .filter((e) => e.option === "alert")
                      .map((e, i) => (
                        <TemplateAlert key={i} {...e.props} />
                      ))}
                  </div>
                );
              } else if (e.option === "modal") {
                return <TemplateModal key={e.key} {...e.props} />;
              }

              return (
                <TemplateConfirm
                  key={e.key}
                  open={resolveReject.length === 2}
                  onClose={() => remove(e)}
                  onCancel={() => handleCancel(e)}
                  onConfirm={() => handleConfirm(e)}
                  {...e.props}
                />
              );
            })}
          </Fragment>,
          root.current
        )}
    </Context.Provider>
  );
};

export default Provider;
