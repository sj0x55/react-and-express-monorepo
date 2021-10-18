export const sort = <T, K extends keyof T>(data: T[], sortBy: K): T[] => {
  data.sort((a: T, b: T) => {
    if (!a[sortBy]) {
      return 1;
    } else if (!b[sortBy]) {
      return -1;
    } else {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    }
  });

  return data;
};
