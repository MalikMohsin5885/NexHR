import axios from 'axios';

interface GoogleAuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const googleAuthService = {
  async loginWithGoogle(accessToken: string): Promise<{ success: boolean; data?: GoogleAuthResponse; message?: string }> {
    try {
      const response = await axios.post<GoogleAuthResponse>(
        "http://localhost:8000/api/auth/google/",
        { access_token: accessToken },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log("Backend Response in react app:", response.data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("Google authentication failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to authenticate with Google"
      };
    }
  }
  
}; 