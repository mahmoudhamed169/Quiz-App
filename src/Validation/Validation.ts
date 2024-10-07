export const PasswordValidation = (minLength: number = 8) => ({
  required: "Password is required",
  minLength: {
    value: minLength,
    message: `Password must be at least ${minLength} characters long`,
  },
  validate: {
    hasUpperCase: (value: string) =>
      /[A-Z]/.test(value) ||
      "Password must contain at least one uppercase letter",
    hasLowerCase: (value: string) =>
      /[a-z]/.test(value) ||
      "Password must contain at least one lowercase letter",
    hasNumber: (value: string) =>
      /\d/.test(value) || "Password must contain at least one number",
    hasSpecialChar: (value: string) =>
      /[!@#$%^&*]/.test(value) ||
      "Password must contain at least one special character",
  },
});
