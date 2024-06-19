import React from "react";
import OptionsBar from "../UI/OptionsBar";
import Properties from "../Features/properties/Properties";

export default function Home() {
  return (
    <div>
      <OptionsBar />
      <Properties allowCrud={false} />
    </div>
  );
}
