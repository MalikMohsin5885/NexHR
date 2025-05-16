import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const BACKEND_URL = 'http://localhost:8000/api/auth/linkedin/token/';
const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;

export interface LinkedInConnectionStatus {
    isConnected: boolean;
    message?: string;
}

export interface AccessTokenResponse {
    success: boolean;
    message?: string;
    access_token?: string;
    expires_in?: number;
}

interface PostJobToLinkedInPayload {
    job_id: string;
}

interface PostJobToLinkedInResponse {
    message: string;
}

class LinkedInService {
    //to get access tokens
    private getAuthHeader() {
        const access_token = localStorage.getItem('access_token');
        return access_token ? {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        } : {};
    }


    // to check weather the current company connects its linkedin or not
    async checkConnectionStatus(): Promise<LinkedInConnectionStatus> {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/linkedin/status/`, {
                headers: this.getAuthHeader()
            });
            
            return {
                isConnected: response.data.connected,
                message: 'Connection checked successfully',
            };
        } catch (error: any) {
            console.error('Error checking LinkedIn connection status:', error);
            return {
                isConnected: false,
                message: error.response?.data?.message || 'Failed to check LinkedIn connection status'
            };
        }
    }


    // to connect the company to linkedin
    async connectLinkedIn(): Promise<LinkedInConnectionStatus> {
        try {
            if (!LINKEDIN_CLIENT_ID || !LINKEDIN_REDIRECT_URI) {
                throw new Error('LinkedIn configuration is missing');
            }

            const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
            authUrl.searchParams.append('response_type', 'code');
            authUrl.searchParams.append('client_id', LINKEDIN_CLIENT_ID);
            authUrl.searchParams.append('redirect_uri', LINKEDIN_REDIRECT_URI);
            authUrl.searchParams.append('state', 'foobar');
            authUrl.searchParams.append('scope', 'email w_member_social openid profile');

            const popup = window.open(authUrl.toString(), '_blank', 'width=600,height=600');
            return {
                isConnected: true,
                message: 'Opening LinkedIn authentication...'
            };
        } catch (error: any) {
            console.error('Error connecting to LinkedIn:', error);
            return {
                isConnected: false,
                message: error.message || 'Failed to connect to LinkedIn'
            };
        }
    }


    //sends the request to beacked with code from linked in
    async getAccessToken(code: string): Promise<AccessTokenResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/linkedin/token/`, { code }, {
                headers: this.getAuthHeader()
            });

            if (response.status === 200) {
                const { access_token: linkedin_token, expires_in } = response.data;

                // // Store the token locally only after successful response
                // localStorage.setItem('linkedin_access_token', linkedin_token);
                // localStorage.setItem('linkedin_token_expires', String(Date.now() + expires_in * 1000));

                return {
                    access_token: linkedin_token,
                    expires_in,
                    success: true,
                };
            }

            return {
                success: false,
                message: 'Failed to obtain token from backend',
            };
        } catch (error: any) {
            console.error('LinkedIn token error:', error);
            return {
                success: false,
                message: error?.response?.data?.error || 'Unknown error',
            };
        }
    }

    // Post a job to LinkedIn
    async postJobToLinkedIn(jobId: string): Promise<{ message: string }> {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/post-job-linkedin/`,
                { job_id: jobId },
                {
                    headers: this.getAuthHeader(),
                }
            );

            console.log('✅ Job posted to LinkedIn:', response.data.message);
            return response.data;
        } catch (error: any) {
            console.error('❌ Failed to post job to LinkedIn:', error.response?.data || error.message);
            throw error;
        }
    }

}

export const linkedinService = new LinkedInService(); 