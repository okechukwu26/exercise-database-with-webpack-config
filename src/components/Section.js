import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MuscleContext } from "../context";
import AppBar from "@material-ui/core/AppBar";

function Section() {
  const { muscles, handleSelect, category } = useContext(MuscleContext);
  const index = category
    ? muscles.findIndex((item) => item === category) + 1
    : 0;
  const onIndexSelect = (e, index) =>
    handleSelect(index === 0 ? "" : muscles[index - 1]);

  return (
    <Paper>
      <Tabs
        value={index}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        onChange={onIndexSelect}
        scrollButtons="on"
        style={{ width: "100%" }}
      >
        <Tab label="All" />
        {muscles.map((item) => (
          <Tab label={item} key={item} />
        ))}
      </Tabs>
    </Paper>
  );
}

export default Section;
