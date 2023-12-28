/* import { Amplify, } from 'aws-amplify'; */
/* import { Authenticator } from '@aws-amplify/ui-react'; */
import '@aws-amplify/ui-react/styles.css';
/* import awsExports from './amplifyconfiguration.json'; */
import Lists from './Lists';
import "./index.css";

/* Amplify.configure(awsExports); */

export default function App() {
  return (
    <>
      
        <main> 
          <button className='float-right'>Sign out </button>
          <h1>LOT - List Of Things</h1>
          
          <Lists />
        </main>
     
    </>
  );
}