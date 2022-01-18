import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText} from "@testing-library/react";
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

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];
    //const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    //debug();
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //await waitForElementToBeRemoved(() => queryByText("Saving"));
    await waitForElement(() => queryByText(container, "Lydia Miller-Jones"));
    //console.log(prettyDOM(appointment));
    //console.log(prettyDOM(appointments));
    //console.log(prettyDOM(container));
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

});
