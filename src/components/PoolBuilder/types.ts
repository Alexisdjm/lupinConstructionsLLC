export type ShapeId = "rectangular" | "l-shape" | "lap" | "custom";
export type InteriorId = "diamond-brite" | "glass-tile";
export type CopingId = "travertine" | "slate" | "teak" | "brick" | "pavers";
export type DeckId = "travertine" | "shellstone" | "concrete" | "charcoal" | "ipe" | "bluestone";
export type LightingId = "white" | "color" | "rgb";

export type PoolConfig = {
  shape: ShapeId;
  length: number;
  width: number;
  depth: number;
  interior: InteriorId;
  coping: CopingId;
  deck: DeckId;
  lighting: LightingId;
  spa: boolean;
  heater: boolean;
  bubbles: boolean;
};

export type ContactDetails = {
  name: string;
  address: string;
  email: string;
  phone: string;
};
