# createFormikFieldsComparator

Simple NPM module to help avoiding unnecessary re-renders in Formik form field components.

Mainly inspired by this article: https://travix.io/using-recompose-hocs-to-get-better-performance-in-forms-using-formik-and-yup-e51024d645ba

Sorry for the long name thou :smile: 

## Usage

```sh
$ npm install create-formik-fields-comparator --save
```

Then feel free to use it in the `shouldComponentUpdate` lifecycle of your form fieldset or field components.

```js
import React from 'react';
import createFormikFieldsComparator from 'create-formik-fields-comparator';

/**
 * Example MyComponent
 * 
 * This is a class based example of how you would
 * use this utility inside your component lifecycle 
 */
export default class MyComponent extends React.Component {
    shouldComponentUpdate(prevProps, nextProps) {
        const compare = createFormikFieldsComparator(['email']);
        return compare(prevProps, nextProps);
    }

    render() {
        return (
            <input
                name="email"
                value={this.props.values.email}
                onChange={this.props.onChange}
            />
        );
    }
}
```

Or with `recompose`.

```js
import React from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import createFormikFieldsComparator from 'create-formik-fields-comparator';

/**
 * Example MyComponent
 * 
 * This is a stateless version
 * of how you would use this utility
 * inside your components.
 * 
 * Note how this component only
 * cares about the `email` field.
 */
const MyComponent = ({
    values,
    onChange,
}) => (
    <input
        name="email"
        value={values.email}
        onChange={onChange}
    />
);

const enhance = shouldUpdate(createFormikFieldsComparator(['email']));

export default enhance(MyComponent);
```

### Full Example with Recompose and Yup

> **Disclaimer:** I made this thinking about its usage with libraries like [recompose](https://github.com/acdlite/recompose) or [proppy](https://github.com/fahad19/proppy). I would deeply use this in combination with one of these two libraries, or at least with plain higher-order components.

```js
/** FormSchema.js */
import object from 'yup/lib/object';
import string from 'yup/lib/string';

export default object({
  email: string().nullable().required('Type an email'),
  facebook: string().nullable().required('Type your facebook'),
  twitter: string().nullable().required('Type your twitter'),
});
```

```js
/** EmailInput.js */
import React, { Fragment } from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import createFormikFieldsComparator from 'create-formik-fields-comparator';

const EmailInput = ({
    values,
    errors,
    touched,
    onChange,
    onBlur
}) => (
    <Fragment>
        <input
            type="email"
            name="email"
            onChange={onChange}
            onBlur={onBlur}
            value={values.email}
        />
        {errors.email && touched.email && <div>{errors.email}</div>}
    </Fragment>
);

const enhance = shouldUpdate(
    createFormikFieldsComparator(['email'])
);

export default enhance(EmailInput);
```

```js
/** SocialFieldset.js */
import React, { Fragment } from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import createFormikFieldsComparator from 'create-formik-fields-comparator';

const SocialFieldset = ({
    values,
    errors,
    touched,
    onChange,
    onBlur
}) => (
    <Fragment>
        <input
            type="text"
            name="facebook"
            onChange={onChange}
            onBlur={onBlur}
            value={values.facebook}
        />
        {errors.facebook && touched.facebook && <div>{errors.facebook}</div>}
        <input
            type="text"
            name="twitter"
            onChange={onChange}
            onBlur={onBlur}
            value={values.twitter}
        />
        {errors.twitter && touched.twitter && <div>{errors.twitter}</div>}
    </Fragment>
);

const enhance = shouldUpdate(
    createFormikFieldsComparator(['facebook', 'twitter'])
);

export default enhance(SocialFieldset);
```

```js
/** Form.js */
import React from 'react';
import { withFormik } from 'formik';

import FormSchema from './FormSchema';
import EmailInput from './EmailInput';
import SocialFieldset from './SocialFieldset';

const Form = ({
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    handleReset,
    isSubmitting,
}) => (
    <form onSubmit={handleSubmit}>
        {/**
          *
          * The EmailInput will only update when 
          * something related to the fields it is interested to change
          *
          **/}
        <EmailInput
            values={values}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        {/**
          *
          * The SocialFieldset will only update when 
          * something related to the fields it is interested to change
          *
          **/}
        <SocialFieldset
            values={values}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        <button type="submit" disabled={isSubmitting}>
            Submit
        </button>
    </form>
);

const enhance = withFormik({
    handleSubmit: (values, actions) => {
        /** do something on submit */
    },
    mapPropsToValues = props => ({
        email: null,
        facebook: null,
        twitter: null
    }),
    validationSchema: FormSchema
});

export default enhance(Form);
```

# Contributors

- Armando Magalhaes