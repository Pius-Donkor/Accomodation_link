import React from "react";
import OptionsBar from "../UI/OptionsBar";
import Properties from "../Features/properties/Properties";
import PropertiesCard from "../Features/properties/PropertiesCard";
const HomeProperties = Properties(PropertiesCard);
export default function Home() {
  return (
    <div>
      <OptionsBar />
      <HomeProperties allowCrud={false} />
    </div>
  );
}
