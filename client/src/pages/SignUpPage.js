// import { SignUp } from '@clerk/clerk-react';

// const SignUpPage = () => (
//   <div className="container mt-5">
//     {/* <h2>Sign Up</h2> */}
//     <SignUp routing="path" path="/sign-up" />
//   </div>
// );
// export default SignUpPage;


import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => (
  <div style={styles.container}>
    <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
  </div>
);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
};

export default SignUpPage;
