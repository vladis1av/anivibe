export {};

declare global {
  interface Window {
    yaContextCb: [{}]
    Ya: {
      Context: {
        AdvManager: {
          render: (obj: { blockId: string;renderTo: string }) => void
        }
      }
    }
  }
}
