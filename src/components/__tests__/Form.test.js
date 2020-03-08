import React from "react";

import { render, cleanup } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {

  // afterEach(cleanup);

  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  const { getByPlaceholderText } = render(
    <Form interviewers={interviewers} />
  );

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  const { getByTestId } = render(
    <Form interviewers={interviewers} name="Lydia Miller-Jones" />
  );

  it("renders with initial student name", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

});