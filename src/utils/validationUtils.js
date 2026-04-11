import { getRegisteredUsers } from "../services/storageServices"


/* * Function that returns true to check if the passed value is empty */
const isRequired = (value) => {
    return value.trim() === ""
}

/* * Function that returns true if entered a valid Email  */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/* * Function that returns true if entered a valid password
Password must contain:
- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number
- One special character
 */
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}

/* *Function that returns true if the password and confirm password are equal  */
const doesPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword
}

const doesEmailExists = (email) => {
    const users = getRegisteredUsers()
    return users.findIndex(user => user.email === email) != -1
}

/*  * Validates Login by checking if the email and password are     provided and  a valid email is entered
    * Returns an Object of error messages */
export const validateLogin = (loginData) => {
    const errors = {}
    if (isRequired(loginData.email)) {
        errors.email = "Email Address is required to Login"
    }
    if (isRequired(loginData.password)) {
        errors.password = "Password is required to Login"
    }
    if (!isValidEmail(loginData.email)) {
        errors.email = "Please Enter a Valid Email Address"
    }
    return errors
}

/*  * Validates Registration by 
    * checking if all the required fields are provided
    * a valid email is entered
    * a valid passsword is entered
    * Passwords are matched
    * Accept the terms and conditions
    * Returns an Object of error messages */
export const validateRegister = (registerData) => {
    const errors = {}
    if (isRequired(registerData.name)) {
        errors.name = "Full Name is Required to registerData"
    }
    if (isRequired(registerData.email)) {
        errors.email = "Email Address is Required to registerData"
    }
    if (isRequired(registerData.password)) {
        errors.password = "Password is required to registerData"
    }
    if (isRequired(registerData.confirmPassword)) {
        errors.confirmPassword = "Confirm Password is required to registerData"
    }
    if (!isValidEmail(registerData.email)) {
        errors.email = "Please Enter a valid Email to registerData"
    }
    if (doesEmailExists(registerData.email)) {
        errors.email = "Email Address already exists. Please use a different email address to Register"
    }
    if (!isValidPassword(registerData.password)) {
        errors.password = `Password must contain:
- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number
- One special character`;
    } if (!doesPasswordsMatch(registerData.password, registerData.confirmPassword)) {
        errors.confirmPassword = "Password and Confirm doesnot Match"
    }
    if (!registerData.acceptedTerms) {
        errors.acceptedTerms = "Please agree the terms and conditions to continue the registration"
    }
    return errors
}

export function validateSubjectData(form) {
  const errors = {};

  if (!form.name?.trim()) {
    errors.name = "Subject name is required";
  }

  if (!form.examDate) {
    errors.examDate = "Exam date is required";
  }

  const today = new Date().toISOString().split("T")[0];
  if (form.examDate && form.examDate < today) {
    errors.examDate = "Back-dated exam date is not allowed";
  }

  if (!form.totalTopics || Number(form.totalTopics) <= 0) {
    errors.totalTopics = "At least one topic is required";
  }

  if (
    form.dailyStudyHours === "" ||
    form.dailyStudyHours === null ||
    Number(form.dailyStudyHours) < 0
  ) {
    errors.dailyStudyHours = "Daily study hours must be 0 or greater";
  }

  if (!form.revisionFrequency) {
    errors.revisionFrequency = "Revision frequency is required";
  }

  if (!form.priority) {
    errors.priority = "Priority is required";
  }

  if (
    form.progress !== "" &&
    form.progress !== null &&
    (Number(form.progress) < 0 || Number(form.progress) > 100)
  ) {
    errors.progress = "Progress must be between 0 and 100";
  }

  if (!form.topics || form.topics.length === 0) {
    errors.topics = "Please add at least one topic";
  }

  return errors;
}