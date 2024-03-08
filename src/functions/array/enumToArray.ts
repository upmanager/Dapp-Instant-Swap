import { array } from 'yup'

type NonFunctional<T> = T extends Function ? never : T

/**
 * Helper to produce an array of enum values.
 * @param enumeration Enumeration object.
 */
export function enumToArray<T>(enumeration: T): NonFunctional<T[keyof T]>[] {
  return (
    // @ts-ignore TYPE NEEDS FIXING
    new array()
  )
}
