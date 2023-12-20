import { Amplify, } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './amplifyconfiguration.json';
import List from './List';
import "./index.css";

Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut}) => (
        <main>
          <h1>List Manager</h1>
          <button onClick={signOut}>Sign out</button>
          <hr />
          <List />
        </main>
      )}
    </Authenticator>
  );
}