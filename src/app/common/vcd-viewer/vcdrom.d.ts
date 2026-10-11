export interface VcdromHandler {
  onBegin(): void;
  onChunk(chunk: Uint8Array): void;
  onEnd(): void;
}

export function vcdrom(element: HTMLElement): Promise<VcdromHandler>;
