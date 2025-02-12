declare module '@gravityxlab/libs' {
  export function useAnchor<T>(options: {
    clickAwayListener?: boolean;
    identity?: string | null;
    stopEvent?: boolean;
  }): {
    show: boolean;
    bounds: DOMRect | null;
    context: T;
    toggle: (event?: any) => void;
    open: (event?: any, context?: T) => void;
    close: (event?: any) => void;
  }

  export class EventUtil {
    static preventDefault(event: any): void;
    static stopPropagation(event: any): void;
    static stop(event: any): void;
  }
  
  export function parseJSON<T = unknown>(string: string): T | null;

  export function ms(input: string): number;

  export function getTimeSlot(date: Date | number, interval?: number): { start: number; end: number };

  export function getTimeSlotTimestamp(date: Date | number, interval?: number): { start: number; end: number; timestamp: number };

  export function format(date: Date, pattern: string): string;

  export function stringify(params: Record<string, any>): string;
  
  export function formatNumber(number: number | string, locale?: string): string;
}
