import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
}

export const Portal: FunctionComponent<PortalProps> = ({ children }) => {
  const [portal, setPortal] = useState<HTMLDivElement>();
  const [isMounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const body = document.body as HTMLBodyElement;
    const container = document.createElement('div');
    body.append(container);
    setPortal(container);
    setMounted(true);

    return () => {
      container.remove();
    };
  }, []);

  return isMounted && portal ? createPortal(children, portal) : null;
};
