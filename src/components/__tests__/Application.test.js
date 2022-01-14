import React from "react";
import { render, cleanup, waitForElement, fireEvent} from "@testing-library/react";
import Application from "components/Application";


/* 

We need to make a few decisions about which types of tests we are going to write. 
We want to build our Application Test Suite using a targeted approach that is sure 
to give us confidence that we are efficiently testing the software.

  We will mock the functions we use from the axios library.
  We will write a test to confirm that the scheduler can load data.
  We will write an asynchronous test that waits for a component to update before proceeding.
  We will use containers to find specific DOM nodes.
  We will chain promises to handle asynchronous testing.
  We will override mock implementations for specific tests.
  We will use setup and teardown functions provided by Jest to perform common tasks.


*/

afterEach(cleanup);

// it("renders without crashing", () => {
//   render(<Application />);
// });

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday"));
// });

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});
