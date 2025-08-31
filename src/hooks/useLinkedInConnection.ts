import { useState, useEffect } from 'react';
import { linkedinService, LinkedInConnectionStatus } from '@/services/linkedinService';
import { toast } from '@/hooks/use-toast';

export const useLinkedInConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    try {
      setIsLoading(true);
      const access_token = localStorage.getItem('access_token');
      
      if (!access_token) {
        setError('No authentication token found');
        setIsConnected(false);
        return;
      }

      const status = await linkedinService.checkConnectionStatus();
      setIsConnected(status.isConnected);
      
      if (!status.isConnected && status.message) {
        setError(status.message);
        // toast({
        //   title: "LinkedIn Connection",
        //   description: status.message,
        //   variant: "destructive",
        // });
      }
    } catch (err) {
      const errorMessage = 'Failed to check LinkedIn connection';
      setError(errorMessage);
      setIsConnected(false);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const connectLinkedIn = async () => {
    try {
      setIsLoading(true);
      const access_token = localStorage.getItem('access_token');
      
      if (!access_token) {
        toast({
          title: "Authentication Error",
          description: "Please login to connect with LinkedIn",
          variant: "destructive",
        });
        return;
      }

      const status = await linkedinService.connectLinkedIn();
      setIsConnected(status.isConnected);
      
      if (status.isConnected) {

        // toast({
        //   title: "Success",
        //   description: "Successfully connected to LinkedIn",
        // });
      } else {
        toast({
          title: "Error",
          description: status.message || 'Failed to connect to LinkedIn',
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to connect to LinkedIn",
        variant: "destructive",
      });
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return {
    isConnected,
    isLoading,
    error,
    checkConnection,
    connectLinkedIn
  };
}; 