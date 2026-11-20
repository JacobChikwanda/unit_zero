/** Chapter ids in unlock order. Ids only - no titles or content. */
export const CHAPTER_ORDER = [
  'ch01',
  'ch02',
  'ch03',
  'ch04',
  'ch05',
  'ch06',
  'ch07',
  'ch08',
  'ch09',
  'ch10',
  'ch11',
  'ch12',
  'ch13',
  'ch14',
  'ch15',
  'ch16',
  'ch17',
  'ch18',
  'ch19',
  'finale',
] as const

export type ChapterId = (typeof CHAPTER_ORDER)[number]
