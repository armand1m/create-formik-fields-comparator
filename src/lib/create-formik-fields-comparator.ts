const createFormikFieldsComparator = (fields: ReadonlyArray<string>) => (
  current: Props,
  next: Props
): boolean => {
  const compare = (type: PossibleFieldTypes) => (field: string) =>
    current[type][field] !== next[type][field];

  return (
    fields.some(compare('values')) ||
    fields.some(compare('errors')) ||
    fields.some(compare('touched'))
  );
};

export default createFormikFieldsComparator;
