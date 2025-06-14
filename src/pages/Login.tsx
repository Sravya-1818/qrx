import { useState } from "react";
import { supabase } from "../lib/supabase"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // 🔐 LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert("Login failed: " + error.message);
      } else {
        alert("Login successful!");
        navigate("/");
      }
    } else {
      // 📝 SIGN UP
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        alert("Signup failed: " + error.message);
      } else {
        // 👤 Add to users table
        const userId = data.user?.id;
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: userId,
            email,
          },
        ]);
        if (insertError) {
          alert("User signup succeeded but data insert failed: " + insertError.message);
        } else {
          alert("Signup successful!");
          navigate("/");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-blue-600 underline"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
