export interface VcdromHandler {
  /** Drops any waveform shown so far and starts parsing a new VCD file. */
  onBegin(): void;
  onChunk(chunk: Uint8Array): void;
  /** Finishes the file; the waveform is rendered once parsing completes. */
  onEnd(): void;
  /** Drops the current file, parsed or not, without rendering it. */
  onAbort(): void;
}

export interface VcdromOptions {
  /** Called when a parsed file cannot be rendered. */
  onError?: (error: unknown) => void;
}

export function vcdrom(element: HTMLElement, options?: VcdromOptions): Promise<VcdromHandler>;
