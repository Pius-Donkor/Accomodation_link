import React from "react";

export default function TableRow({ children, onClick = () => {} }) {
  return <tr onClick={onClick}>{children}</tr>;
}
