import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex items-center justify-center min-h-[100vh] px-4 py-8">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
