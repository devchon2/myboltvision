declare module 'react-slick' {
  import * as React from 'react';
  
  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    className?: string;
  }

  interface Slider extends React.Component<Settings> {}
  const Slider: React.ComponentClass<Settings>;
  export = Slider;
}
