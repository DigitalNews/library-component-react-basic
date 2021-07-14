# basic-component-react

_basic-component-react es una libreria creado con los componentes basicos que se requiere en un proyecto como modal, alert, confirm._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Que cosas necesitas para instalar la libreria y como instalarlas_

```
react
react-dom
```

### Instalación 🔧

_Los siguientes pasos para la instalación son los siquientes:_

```
npm i basic-component-react
```

_Ejemplo de uso Material UI:_

_Template Confirm_

```tsx
import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

interface IConfirmationDialogProps extends IConfirmProps {
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface IConfirmProps {
  open?: boolean;
  options?: {
    title?: string;
    description?: string;
    cancellationText?: string;
    confirmationText?: string;
  };
}

const ConfirmationDialog: React.FunctionComponent<IConfirmationDialogProps> = ({
  open,
  onClose,
  options,
  onCancel,
  onConfirm,
}) => {
  const {
    title = "¿Estas seguro(a)?",
    description,
    cancellationText = "Cancelar",
    confirmationText = "Ok",
  } = options;
  return (
    <Dialog disableBackdropClick fullWidth open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onCancel}>{cancellationText}</Button>
        <Button color="primary" onClick={onConfirm}>
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
```

_Template Modal_

```tsx
import * as React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid, IconButton, Typography } from "@material-ui/core";

import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",

      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      minWidth: 500,
      maxWidth: 600,
      //   border: '2px solid #000',
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface IModalTemplateProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}

const ModalTemplate: React.FunctionComponent<IModalTemplateProps> = ({
  open,
  onClose,
  title,
  children,
  subtitle,
}) => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: 'center',
                justifyContent: "center",
                justifyItems: "center",
              }}
              item
              md={11}
            >
              <Typography noWrap variant="h5">
                {title}
              </Typography>
              {subtitle && (
                <Typography noWrap variant="caption" color="textSecondary">
                  {subtitle}
                </Typography>
              )}
            </Grid>
            <Grid item md={1}>
              <IconButton onClick={onClose}>
                <CancelIcon />
              </IconButton>
            </Grid>
          </Grid>
          {/* <Divider /> */}
          <br />
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalTemplate;
```

_Template Alert_

```tsx
import * as React from "react";

import { AlertTitle, Alert } from "@material-ui/lab/";

interface IAlertTemplateProps {
  title?: string;
  message: React.ReactNode;
  severity?: "error" | "info" | "success" | "warning";
  onClose?: () => void;
}

const AlertTemplate: React.FunctionComponent<IAlertTemplateProps> = ({
  message,
  title,
  severity = "info",
  onClose,
}) => {
  return (
    <Alert
      style={{ borderRadius: "0px" }}
      onClose={onClose}
      severity={severity}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};

export default AlertTemplate;
```

_Uso de provider con los template:_

```tsx
import { Provider as ProviderBasic } from "basic-component-react";

import ConfirmTemplate from "template/Confirm";
import ModalTemplate from "template/Modal";
import AlertTemplate from "template/Alert";

const Main = () => {
  return (
    <ProviderBasic
      templateConfirm={ConfirmTemplate}
      templateModal={ModalTemplate}
      templateAlert={AlertTemplate}
    >
      {children}
    </ProviderBasic>
  );
};
```

_Uso de useBasic:_

```tsx
import useBasic from "basic/useBasic";

interface ConfirmBasic {
  options?: {
    title?: string;
    description?: string;
    cancellationText?: string;
    confirmationText?: string;
  };
}

interface ModalBasic {
  title: string;
  subtitle?: string;
  open: boolean;
  children: React.ReactNode;
}

interface AlertBasic {
  title?: string;
  message: React.ReactNode;
  severity?: "error" | "info" | "success" | "warning";
}

export const useConfirm = () => useBasic<ConfirmBasic>("confirm");
export const useModal = () => useBasic<ModalBasic>("modal");
export const useAlert = () => useBasic<AlertBasic>("alert");
```

_Ejemplo de uso:_

```tsx
import React, { useState } from "react";
import { useAlert, useConfirm, useModal } from "utils/basic";

const Example = () => {
  const modal = useModal();
  const alert = useAlert();
  const confirm = useConfirm();

  return <div>
 <button   onClick={() => modal.show({
    title: 'Modal Titel',
    children: 'childre',
    subtitle: 'modal subtitle',
    open: true,
  });
}> modal
</button>

<button onClick={() =>  alert.show({
    message: 'mensaje alert',
    severity: 'info',
    title: 'Alert title',
  });
}> alert
 </button>

<button onClick={() =>  confirm.show({
    options: {},
  });
}> confirm
</button>
<div>
};
```

## Construido con 🛠️

- [React](https://es.reactjs.org/docs/getting-started.html) - El framework web usado

## Autores ✒️

- **Rony cb** - _Trabajo Inicial_ - [mrvalem](https://github.com/mrbalem)

## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

---

⌨️ con ❤️ por [mrvalem](https://github.com/mrbalem) 😊
