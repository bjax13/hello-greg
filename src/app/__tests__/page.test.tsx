import { act, render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home", () => {
  const originalRaf = globalThis.requestAnimationFrame;
  const originalCancel = globalThis.cancelAnimationFrame;

  afterEach(() => {
    globalThis.requestAnimationFrame = originalRaf;
    globalThis.cancelAnimationFrame = originalCancel;
    jest.restoreAllMocks();
  });

  it("renders the greeting", () => {
    globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(performance.now());
      return 0;
    };
    jest.spyOn(Date.prototype, "toLocaleString").mockReturnValue("Apr 15, 2026");

    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "hello greg" }),
    ).toBeInTheDocument();
  });

  it("shows a neutral placeholder until the first animation frame resolves", () => {
    let stored: FrameRequestCallback | null = null;
    globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
      stored = cb;
      return 1;
    };
    jest.spyOn(Date.prototype, "toLocaleString").mockReturnValue("Apr 15, 2026");

    render(<Home />);

    expect(screen.getByText("—")).toBeInTheDocument();

    act(() => {
      stored?.(performance.now());
    });

    expect(screen.queryByText("—")).not.toBeInTheDocument();
    expect(screen.getByText("Apr 15, 2026")).toBeInTheDocument();
  });

  it("formats load time with locale-aware medium date and time", () => {
    const toLocaleString = jest
      .spyOn(Date.prototype, "toLocaleString")
      .mockReturnValue("formatted-load-time");

    globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(performance.now());
      return 0;
    };

    render(<Home />);

    expect(toLocaleString).toHaveBeenCalledWith(undefined, {
      dateStyle: "medium",
      timeStyle: "medium",
    });
    expect(screen.getByText("formatted-load-time")).toBeInTheDocument();
  });

  it("cancels the animation frame on unmount", () => {
    const cancel = jest.fn();
    globalThis.cancelAnimationFrame = cancel;
    let stored: FrameRequestCallback | null = null;
    globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
      stored = cb;
      return 42;
    };

    const { unmount } = render(<Home />);
    unmount();

    expect(cancel).toHaveBeenCalledWith(42);
    expect(stored).not.toBeNull();
  });
});
