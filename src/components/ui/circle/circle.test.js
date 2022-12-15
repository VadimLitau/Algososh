import { render, screen, fireEvent } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование Circle", () => {
  it("Без буквы", () => {
    const item = render(<Circle letter="" />);
    expect(item).toMatchSnapshot;
  });

  it("С Буквами", () => {
    const item = render(<Circle letter="abc" />);
    expect(screen.getByText("abc")).toBeInTheDocument();
    expect(item).toMatchSnapshot;
  });

  it("С head", () => {
    const item = render(<Circle head="abc" />);
    expect(screen.getByText("abc")).toBeInTheDocument();
    expect(item).toMatchSnapshot;
  });

  it("с react-элементом в head", () => {
    const item = render(<Circle head={<Circle />} />);
    expect(item).toMatchSnapshot;
  });

  it("С tail", () => {
    const item = render(<Circle tail="abc" />);
    expect(screen.getByText("abc")).toBeInTheDocument();
    expect(item).toMatchSnapshot;
  });

  it("с react-элементом в tail", () => {
    const item = render(<Circle tail={<Circle />} />);
    expect(item).toMatchSnapshot;
  });

  it("С index", () => {
    const item = render(<Circle index="abc" />);
    expect(screen.getByText("abc")).toBeInTheDocument();
    expect(item).toMatchSnapshot;
  });

  it("с пропxом isSmall ===  true", () => {
    const item = render(<Circle isSmall={true} />);
    expect(item).toMatchSnapshot;
  });

  it("в состоянии default", () => {
    const item = render(<Circle state={ElementStates.Default} />);
    expect(item).toMatchSnapshot;
  });

  it("в состоянии changing", () => {
    const item = render(<Circle state={ElementStates.Changing} />);
    expect(item).toMatchSnapshot;
  });

  it("в состоянии modified", () => {
    const item = render(<Circle state={ElementStates.Modified} />);
    expect(item).toMatchSnapshot;
  });
});
