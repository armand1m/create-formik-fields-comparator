// tslint:disable:no-expression-statement
import test from 'ava';
import createFormikFieldsComparator from './create-formik-fields-comparator';

const createFormikProps = (props: any) => ({
  errors: {},
  touched: {},
  values: {},
  ...props
});

test('returns a function', t => {
  const compare = createFormikFieldsComparator(['test']);
  t.is(typeof compare, 'function');
});

const runSuiteFor = (type: PossibleFieldTypes) => {
  test(`returns false when comparator is called with shallow equal ${type} it is interested in`, t => {
    const compare = createFormikFieldsComparator(['foo']);
    const prevValues = { foo: 'bar' };
    const nextValues = { foo: 'bar' };

    const prevProps = createFormikProps({ [type]: prevValues });
    const nextProps = createFormikProps({ [type]: nextValues });

    const result = compare(prevProps, nextProps);

    t.is(result, false);
  });

  test(`returns true when comparator is called with different ${type} it is interested in`, t => {
    const compare = createFormikFieldsComparator(['foo']);
    const prevValues = { foo: 'bar' };
    const nextValues = { foo: 'baz' };

    const prevProps = createFormikProps({ [type]: prevValues });
    const nextProps = createFormikProps({ [type]: nextValues });

    const result = compare(prevProps, nextProps);

    t.is(result, true);
  });

  test(`returns false when comparator is called with different ${type} it is not interested in`, t => {
    const compare = createFormikFieldsComparator(['foo']);
    const prevValues = { foo: 'bar', bar: 'foo' };
    const nextValues = { foo: 'bar', bar: 'foz' };

    const prevProps = createFormikProps({ [type]: prevValues });
    const nextProps = createFormikProps({ [type]: nextValues });

    const result = compare(prevProps, nextProps);

    t.is(result, false);
  });
};

runSuiteFor('values');
runSuiteFor('errors');
runSuiteFor('touched');
