import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
};

export default function SignInPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirectTo") || "/";

  return (
    <div style={styles.container}>
      <SignIn redirectUrl={redirectTo} />
    </div>
  );
}
