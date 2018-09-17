const createFormikFieldsComparator = (fields: ReadonlyArray<string>) => (
  current: Props,
  next: Props
): boolean => {
  const compare = (type: PossibleFieldTypes) => (field: string) =>
    current[type][field] !== next[type][field];

  const test = (type: PossibleFieldTypes) => fields.some(compare(type));

  return test('values') || test('errors') || test('touched');
};

export default createFormikFieldsComparator;
