import { useState, useCallback } from 'react';

const defaultProps = {
  clickAwayListener: false,
};

function useAnchor({ clickAwayListener = false } = defaultProps) {
  const [anchor, setAnchor] = useState(null);
  const close = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    setAnchor(null);

    if (clickAwayListener) {
      window.removeEventListener('click', close);
    }
  }, []);

  const open = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    setAnchor(event);

    if (clickAwayListener) {
      window.addEventListener('click', close);
    }
  }, []);

  const toggle = (event) => {
    if (anchor) {
      close(event);
    } else {
      open(event);
    }
  };

  return {
    open: Boolean(anchor),
    toggle,
    close,
  };
}

export { useAnchor };
