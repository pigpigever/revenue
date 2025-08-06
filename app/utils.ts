export const getUniqueArray = <T extends Record<string, unknown>, K extends keyof T>(arr: T[], key: K) => {
  const map = new Map<T[K], boolean>();
  const newArr = [] as T[];
  arr.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], true);
      newArr.push(item);
    }
  });
  return newArr;
};

export const getTime = (year: number): { startTime: string; endTime: string } => {
  const now = new Date();
  const endTime = now.toISOString().split('T')[0];

  const past = new Date();
  past.setFullYear(now.getFullYear() - year);

  const startTime = past.toISOString().split('T')[0];

  return { startTime, endTime };
};