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
          }) => void
        }
      }
    }
  }
}
