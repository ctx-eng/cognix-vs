export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export function asMutable<T>(value: T): Mutable<T> {
  return value as Mutable<T>;
}
