export const MessageKey = {
  getData: 'getData',
} as const

export type MessageKeyType = typeof MessageKey[keyof typeof MessageKey]
