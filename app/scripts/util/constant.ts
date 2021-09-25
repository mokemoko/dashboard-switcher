export const MessageKind = {
  getData: 'getData',
} as const

export type MessageKindType = typeof MessageKind[keyof typeof MessageKind]
