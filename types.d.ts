declare global {
  interface Window {
    dataLayer: any;
    gtag: any;
  }

  namespace React {
    interface ReactElement {
      nodeName: any;
      attributes: any;
      children: any;
    }
  }
}

export {};
