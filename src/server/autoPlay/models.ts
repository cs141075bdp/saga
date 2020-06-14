export type TPointImage = Array<number>

export type TMouseEvent = {
  mouseData?: number,
  wParam?: number,
  wTime: number,
  x: number,
  y: number,
  waitImage: boolean,
  vkCode?: number,
  scanCode?: number,
  sx?: number,
  sy?: number,
  Images?: Array<TPointImage>,
}

export const MouseEventStructure: TMouseEvent = {
  mouseData: 0,
  wParam: 512,
  wTime: 0,
  x: 0,
  y: 0,
  waitImage: false,
};

export type TRecordMacrosInformation = {
  id: number,
  macros: string,
  description: string,
  file: string,
}

export type TRecordMacros = {
  id: number,
  macros: string,
  description: string,
  childs: Array<TMouseEvent>,
}
