import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useSetState } from '@mantine/hooks';

import { events } from '@/constants';

interface Props {
  top?: number;
  affixedStyles?: React.CSSProperties | Record<string, React.CSSProperties>;
}

const GrandFather = styled.div``;

const Father = styled.div<{ affixed: boolean; top: number; affixedStyles?: React.CSSProperties }>(
  ({ affixed, top, affixedStyles }) =>
    affixed
      ? {
          zIndex: 20,
          position: 'fixed',
          top,
          ...affixedStyles,
        }
      : {}
);

export const Affix: React.FC<PropsWithChildren<Props>> = ({ children, top = 0, affixedStyles }) => {
  const grandFatherRef = useRef<HTMLDivElement>(null);
  const fatherRef = useRef<HTMLDivElement>(null);
  const [affixed, setAffixed] = useState(false);
  const [state, setState] = useSetState<Pick<React.CSSProperties, 'width' | 'height'>>({});

  const init = useCallback(() => {
    setState({ width: fatherRef.current?.clientWidth, height: fatherRef.current?.clientHeight });
  }, [setState]);

  const listener = useCallback(() => {
    const { scrollTop } = document.documentElement || document.body;
    const offsetTop = Number(grandFatherRef.current?.offsetTop);

    setAffixed(offsetTop - scrollTop <= top);
  }, [top]);

  const setEventListener = useCallback(() => {
    events.forEach((eventName) => {
      document.addEventListener(eventName, listener);
    });
  }, [listener]);

  const removeEventListener = useCallback(() => {
    events.forEach((eventName) => {
      document.removeEventListener(eventName, listener);
    });
  }, [listener]);

  useEffect(() => {
    setEventListener();

    return () => {
      removeEventListener();
    };
  }, [listener, removeEventListener, setEventListener]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <GrandFather ref={grandFatherRef} style={state}>
      <Father
        ref={fatherRef}
        top={top}
        affixed={affixed}
        affixedStyles={affixedStyles}
        style={affixed ? state : undefined}
      >
        {children}
      </Father>
    </GrandFather>
  );
};
