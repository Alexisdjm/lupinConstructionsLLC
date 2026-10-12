export interface Project {
  id: string;
  image: string;
  category: string;
  title: string;
  location: string;
}

export type DesktopSlides = 4 | 5 | 6;

export interface SliderBreakpoints {
  mobile: number;
  tablet: number;
}
