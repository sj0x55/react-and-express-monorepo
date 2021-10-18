export const compose = <T extends unknown[], R>(fn1: (...args: T) => R, ...fns: Array<(a: R) => R>) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    (val) => val,
  );
  return (...args: T) => piped(fn1(...args));
};
