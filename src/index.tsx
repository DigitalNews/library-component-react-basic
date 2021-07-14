import React from "react";

export const Hello: React.FC<{ name: String }> = ({ name }) => {
  if (!name) {
    name = "Mundo";
  }
  return <h1>¡¡Hola {name}!!</h1>;
};
