# Frontend

This project is based on **React.js**, which is a JavaScript library for building user interfaces. It has lots of pros:

- Declarative and errorless
- Reusable components
- Large community

Also, this project is written in **TypeScript**, which is a typed superset of JavaScript. These two are widely-used nowadays. Many of TypeScript grammars are based on **ECMAScript 6+**, which you can learn [here](https://flaviocopes.com/ecmascript/).

A basic grammar is shown below:

`MyFunctionComponent.tsx`:

```tsx
import React, { FunctionComponent } from 'react';

const MyFunctionComponent: FunctionComponent = () => {
  // some action

  // return JSX
  return <div>Hello, World!</div>;
};
```

This is a component of type `FunctionComponent`. There is another kind of components, `Component`.

`MyComponent.tsx`

```tsx
import React, { Component } from 'react';

class HelloMessage extends Component {
  render() {
    return <div>Hello, World!</div>;
  }
}
```

Learn more in [React tutorial](https://reactjs.org/tutorial/tutorial.html) and [TypeScript tutorial](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html), or any other documentations.
