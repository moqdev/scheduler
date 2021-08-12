import React from "react";

import { 
  render, 
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  queryByText,
 } from "@testing-library/react";

import DayListItem from "components/DayListItem";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("DayListItem.test.js", () => {
  /* test number one */
  it("renders without crashing", () => {
    render(<DayListItem />);
  });

/* test two */

it("renders 'no spots remaining' when there are 0 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={0} />);
  expect(getByText("no spots remaining")).toBeInTheDocument();
});
/* test three */
it("renders '1 spot remaining' when there is 1 spot", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={1} />);
  expect(getByText("1 spot remaining")).toBeInTheDocument();
});
/* four */
it("renders '2 spots remaining' when there are 2 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={2} />);
  expect(getByText("2 spots remaining")).toBeInTheDocument();
});
/* five */
it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    fireEvent.click(getByAltText(container, "Delete"));
    expect(
      getByText(container, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    fireEvent.click(getByText(container, "Confirm"));
    expect(getByText(container, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByAltText(container, "Add"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  /* test six */
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    fireEvent.click(getByAltText(container, "Edit"));
    expect(getByText(container, "Save")).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(container, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    await waitForElement(() => getByAltText(container, "Add"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  /* test seven */
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    fireEvent.click(getByAltText(container, "Add"));
    fireEvent.change(getByPlaceholderText(container, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(container, "Sylvia Palmer"));
    fireEvent.click(getByText(container, "Save"));
    const errmsg = "Could not save appointment";
    await waitForElement(() => getByText(container, errmsg));
    expect(getByText(container, errmsg)).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    fireEvent.click(getByAltText(container, "Delete"));
    await waitForElement(() =>
      getByText(container, "Are you sure you would like to delete?")
    );
    fireEvent.click(getByText(container, "Confirm"));
    await waitForElement(() => getByText(container, "Deleting"));
    const errmsg = "Could not delete appointment";
    expect(getByText(container, errmsg)).toBeInTheDocument();
  });
});