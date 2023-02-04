export const joinClasses = (...args) => args.filter(Boolean).join(" ");
export const omit = (key, { [key]: _, ...rest }) => rest;
