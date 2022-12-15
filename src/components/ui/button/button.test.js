import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Тестирование компонента Button", () => {
  it("В кнопке есть текст", () => {
    render(<Button text="test" />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("В кнопке нет текста", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Кнопка заблокирована", () => {
    const item = render(<Button disabled={true} />);
    expect(item).toMatchSnapshot();
  });

  it("Кнопка в процессе загрузки", () => {
    const item = render(<Button isLoader={true} />);
    expect(item).toMatchSnapshot();
  });

  it("Нажатие на кнопку", () => {
    const clickButton = jest.fn();
    const item = render(<Button text="textButton" onClick={clickButton} />);
    fireEvent.click(screen.getByText("textButton"));
    expect(clickButton).toHaveBeenCalled();
  });
});
