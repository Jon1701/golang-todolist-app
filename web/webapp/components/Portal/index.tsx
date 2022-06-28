import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  /**
   * Child nodes to be rendered.
   */
  children: React.ReactNode;
}

/**
 * Renders a component in a React Portal.
 *
 * @param props Component props.
 * @param props.children Child nodes to be rendered.
 * @returns Component rendered in a Portal.
 */
const Portal: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#portal") as HTMLElement)
    : null;
};

export default Portal;
