import React, { useState, useRef, ReactHTMLElement } from "react";

const Web23Scrollbox: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{
    isScrolling: boolean;
    clientX: number;
    scrollX: number;
  }>({ isScrolling: false, clientX: 0, scrollX: 0 });

  const onMouseDown = (e: any) => {
    setState({ ...state, isScrolling: true, clientX: e.clientX });
  };

  const onMouseUp = () => {
    setState({ ...state, isScrolling: false });
  };

  const onMouseMove = (e: any) => {
    const { clientX, scrollX } = state;
    if (state.isScrolling) {
      if (ref.current != null) {
        ref.current.scrollLeft = scrollX - (e.clientX - clientX);
        setState({
          ...state,
          scrollX: ref.current.scrollLeft,
          clientX: e.clientX,
        });
      }
    }
  };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="flex gap-2 overflow-x-auto no-scrollbar cursor-grab"
    >
      {React.Children.map(children, (child) => React.Children.only(child))}
    </div>
  );
};

export default Web23Scrollbox;
