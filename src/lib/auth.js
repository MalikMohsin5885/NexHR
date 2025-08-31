// lib/auth.js
export const registerUser = (userData) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.email === userData.email);

  if (userExists) {
    return { success: false, message: "User already exists." };
  }

  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true, message: "Registration successful." };
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email);

  if (!user) {
    return { success: false, message: "User does not exist. Please sign up first." };
  }

  if (user.password !== password && !user.isGoogleUser) {
    return { success: false, message: "Invalid password." };
  }

  return { success: true, message: "Login successful." };
};

export const registerGoogleUser = (email) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.email === email);

  if (!userExists) {
    users.push({ email, isGoogleUser: true }); // Mark as Google user
    localStorage.setItem("users", JSON.stringify(users));
  }
};