import { auth, provider, signInWithPopup } from "../configs/firebase";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User info:", user);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center px-6 py-2 space-x-2 border font-semibold text-black rounded-lgfocus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      <img
        src="/src/assets/GoogleLogo.svg.webp"
        alt="Google icon"
        className="w-8 h-8 bg-white"
      />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
