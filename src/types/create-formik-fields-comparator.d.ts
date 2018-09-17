type PossibleFieldTypes = 'values' | 'errors' | 'touched';

interface DynamicObject {
  [name: string]: any;
}

interface Props extends DynamicObject {
  values: DynamicObject;
  errors: DynamicObject;
  touched: DynamicObject;
}
