import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { validateLogin } from "../utils/validationUtils";
import { authenticateLogin } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    else {
    if (authenticateLogin(formData)) {
    navigate("/dashboard");
    } else {
      setErrors({...errors,
        general: "Invalid Email or Password"
      })
    }
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Access your SmartPrep account"
      sideTitle={
        <>
          Continue your
          <span className="block text-blue-600">study journey</span>
        </>
      }
      sideDescription="Sign in to access your dashboard, tasks, and focus sessions."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email || errors.email ? errors.email : ""}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password || errors.password ? errors.password : ""}
        />

      {errors.general && (
        <div className="mt-2 text-xs text-red-500 sm:text-sm">
           
            <p className="font-medium">{errors.general}</p>
          
        </div>
      )}

        <Button type="submit" fullWidth>
          Sign In
        </Button>

        <p className="text-center text-sm text-slate-600">
          New user?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}