import { useCallback, useMemo, useState } from 'react';

const defaultUseAnchorOptions = {
  clickAwayListener: false,
};

function useAnchor({ clickAwayListener = false, identity = null } = defaultUseAnchorOptions) {
  const [context, setContext] = useState({});
  const [anchor, setAnchor] = useState(null); // HTMLElement | boolean | null

  const close = useCallback((event) => {
    event?.preventDefault();
    event?.stopPropagation();

    setContext({});

    setAnchor(null);

    if (clickAwayListener) {
      window.removeEventListener('click', close);
    }
  }, []);

  const open = useCallback((event, context) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (context) {
      setContext(context);
    }

    if (!event) {
      setAnchor(true);
    } else if (identity) {
      setAnchor(event.target.closest(`[${identity}]`) || event.target);
    } else {
      setAnchor(event.target);
    }

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

  const bounds = useMemo(() => {
    if (typeof anchor === 'boolean' || anchor === null) {
      return null;
    }

    return anchor.getBoundingClientRect();
  }, [anchor]);

  return {
    show: Boolean(anchor),
    bounds,
    context,
    toggle,
    open,
    close,
  };
}

export { useAnchor };
