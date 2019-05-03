import React, { FunctionComponent, useState } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';

interface Props extends RouteComponentProps {
  text: string;
}

const SecondWithoutLocation: FunctionComponent<Props> = ({ text, location }) => {
  const [array, setArray] = useState([] as string[]);

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    const usersString = (event.target as HTMLInputElement).value;
    const splittedArray = usersString.split(/\s+/);

    setArray(splittedArray);
  };

  console.log(location);

  return (
    <>
      <input type="text" placeholder="Type here" onKeyPress={handleSubmit} />
      <button>Click me</button>
      <div
        style={{
          border: '3px solid red',
          width: 'fit-content',
        }}
      >
        {array.map((x) => (
          <div>{x}</div>
        ))}
      </div>
    </>
  );
};

export const Second = withRouter(SecondWithoutLocation);
