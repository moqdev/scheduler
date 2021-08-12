import React from "react";
import "./DayListItem.scss";
const className = require("classnames");

const formatSpots = function (spots) {
  return !spots || spots === 0
    ? "no spots remaining"
    : `${spots} spot${spots === 1 ? "" : "s"} remaining`;
};

export default function DayListItem(props) {
  let listClass = className("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      className={listClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

