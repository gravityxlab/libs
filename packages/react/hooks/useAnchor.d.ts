export declare function useAnchor<T>(options: {
  clickAwayListener?: boolean;
  identity?: string | null;
}): {
  show: boolean;
  bounds: DOMRect | null;
  context: T;
  toggle: (event?: any) => void;
  open: (event?: any, context?: T) => void;
  close: (event?: any) => void;
}