import axios from 'axios';

interface PasswordResetRequestData {
  email: string;
}

interface PasswordResetConfirmData {
  password: string;
}

export const requestPasswordReset = async (data: PasswordResetRequestData) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/auth/forgot-password/`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Failed to request password reset');
    }
    throw new Error('Failed to request password reset');
  }
};

export const confirmPasswordReset = async (
  uidb64: string,
  token: string,
  data: PasswordResetConfirmData
) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/auth/reset-password/${uidb64}/${token}/`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Failed to reset password');
    }
    throw new Error('Failed to reset password');
  }
}; 