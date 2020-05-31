export type TPointImage = Array<number>

export type TMouseEvent = {
  mouseData: number,
  wParam: number,
  wTime: number,
  x: number,
  y: number,
  sx?: number,
  sy?: number,
  Images?: Array<TPointImage>,
}

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
