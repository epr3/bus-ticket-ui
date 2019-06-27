import React from "react";

import { Input } from "reactstrap";

const amenityOptionList = [
  { icon: "wifi", label: "Wifi" },
  { icon: "air-freshener", label: "New" },
  { icon: "wind", label: "AC" },
  { icon: "tv", label: "TV" },
  { icon: "suitcase", label: "High Capacity" }
].map(item => (
  <option value={item.icon} key={item.icon}>
    {item.label}
  </option>
));

function AmenityIconSelect({ onChange, value, innerRef }) {
  return (
    <Input
      type="select"
      name="icon"
      value={value}
      onChange={e => onChange(e.target.value)}
      innerRef={innerRef}
    >
      <option value={""}>None</option>
      {amenityOptionList}
    </Input>
  );
}

export default AmenityIconSelect;
