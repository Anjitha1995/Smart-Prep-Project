import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { validateRegister } from "../utils/validationUtils";
import AuthLayout from "../components/layout/AuthLayout";
import { getRegisteredUsers, setRegisteredUsers } from "../services/storageServices";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "acceptedTerms" && errors.acceptedTerms) {
      setErrors((prev) => ({ ...prev, acceptedTerms: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateRegister(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    else {
      
      const user = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password
      }
      let registeredUsers = getRegisteredUsers()
      registeredUsers.push(user)
      setRegisteredUsers(registeredUsers)
      navigate("/login");
    }

    
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Set up your SmartPrep account"
      sideTitle={
        <>
          Start planning your
          <span className="block text-indigo-600">study smarter</span>
        </>
      }
      sideDescription="Join SmartPrep to organize subjects and track progress."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your full name"
          error={touched.name || errors.name ? errors.name : ""}
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email"
          error={touched.email || errors.email ? errors.email : ""}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Create a password"
          error={touched.password || errors.password ? errors.password : ""}
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm your password"
          error={
            touched.confirmPassword || errors.confirmPassword
              ? errors.confirmPassword
              : ""
          }
        />

        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-slate-700">
              I agree to the Terms &amp; Conditions
            </span>
          </label>

          {errors.acceptedTerms && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {errors.acceptedTerms}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full">
          Create Account
        </Button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>


  );
}