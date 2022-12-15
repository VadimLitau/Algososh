import { reverseStrings } from "./utils";

describe("Корректно разворачивает строку", () => {
  it("с чётным количеством символов", () => {
    const test = reverseStrings("test");
    expect(test).toBe("tset");
  });

  it("с нечетным количеством символов", () => {
    const test = reverseStrings("tests");
    expect(test).toBe("stset");
  });

  it("с одним символом", () => {
    const test = reverseStrings("t");
    expect(test).toBe("t");
  });

  it("пустую строку", () => {
    const test = reverseStrings("");
    expect(test).toBe("");
  });
});
