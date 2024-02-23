export {};

declare global {
  interface Window {
    yaContextCb: [{}]
    Ya: {
      Context: {
        AdvManager: {
          render: (obj: {
            statId?: number;
            blockId: string;
            renderTo: string;
            darkTheme?: boolean;
            onError: (data: { type: string; code: string; text: string }) => void
          }) => void
        }
      }
    }
  }
}
