import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => (
  <div className="container mt-5">
    <h2>Sign Up</h2>
    <SignUp routing="path" path="/sign-up" />
  </div>
);
export default SignUpPage;
