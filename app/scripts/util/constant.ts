export const MessageKind = {
  getConfig: 'getConfig',
} as const

export type MessageKindType = typeof MessageKind[keyof typeof MessageKind]
