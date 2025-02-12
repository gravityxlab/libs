import { useCallback, useMemo, useState } from 'react';

const DEFAULT = {
  clickAwayListener: false,
  stopEvent: false,
  identity: null,
};

function useAnchor({
  clickAwayListener = DEFAULT.clickAwayListener,
  stopEvent = DEFAULT.stopEvent,
  identity = DEFAULT.identity,
} = DEFAULT) {
  const [context, setContext] = useState({});
  const [anchor, setAnchor] = useState(null); // HTMLElement | boolean | null

  const close = useCallback((event) => {
    if (stopEvent) {
      event?.preventDefault();
      event?.stopPropagation();
    }

    setContext({});

    setAnchor(null);

    if (clickAwayListener) {
      window.removeEventListener('click', close, false);
    }
  }, []);

  const open = useCallback((event, context) => {
    if (stopEvent) {
      event?.preventDefault();
      event?.stopPropagation();
    }

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
      setTimeout(() => {
        window.addEventListener('click', close, false);
      }, 0);
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
