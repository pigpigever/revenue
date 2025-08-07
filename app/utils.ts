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

export const getOriginTime = (startTime: string, endTime: string) => {
  const startYear = +startTime.split('-')?.[0];
  const endYear = +endTime.split('-')?.[0];
  const year = endYear - startYear - 1;
  const res = getTime(year);
  const originYear = +res.startTime.split('-')?.[0];
  const originMonth = +res.endTime.split('-')?.[1];
  return {
    originYear,
    originMonth,
  };
};

export const extractYearFromStr = (str: string) => {
  const result = str?.split('/');
  return +result?.[0];
};

export const extractMonthFromStr = (str: string) => {
  const result = str?.split('/');
  return +result?.[1];
};


export function addThousandsSeparator(input: string): string {
  const [integer, decimal] = input.split('.');
  const withComma = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal ? `${withComma}.${decimal}` : withComma;
}

export function formatNumberWithUnit(value: number): string {
  if (value >= 1e8) {
    const formatted = (value / 1e8).toString();
    return addThousandsSeparator(formatted) + ' 億';
  } else if (value >= 1e4) {
    const formatted = (value / 1e4).toString();
    return addThousandsSeparator(formatted) + ' 萬';
  } else {
    return addThousandsSeparator(value.toString());
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(fn: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, wait);
  };
};