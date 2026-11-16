export function getByPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current == null || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[key];
  }, source);
}

export function setByPath<T>(source: T, path: string, value: unknown): T {
  const keys = path.split(".");

  const clone = (input: unknown, index: number): unknown => {
    if (index === keys.length) return value;

    const key = keys[index];
    const current = input as Record<string, unknown> | undefined;
    const next = Array.isArray(current)
      ? [...current]
      : { ...(current ?? {}) };

    (next as Record<string, unknown>)[key] = clone(
      current?.[key],
      index + 1,
    );

    return next;
  };

  return clone(source, 0) as T;
}
