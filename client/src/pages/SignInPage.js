import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => (
  <div className="container mt-5">
    <h2>Sign In</h2>
    <SignIn routing="path" path="/sign-in" />
  </div>
);
export default SignInPage;
