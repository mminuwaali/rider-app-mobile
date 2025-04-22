import React from 'react';
import { TokenManager } from '@/utils/token';

export const useTokenListener = (interval: number = 60000) => {
  React.useEffect(() => {
    const checkToken = async () => {
      try {
        const accessToken = await TokenManager.getAccessToken();
        if (accessToken && (await TokenManager.isTokenExpired(accessToken))) {
          console.log('Access token expired. Refreshing...');
          await TokenManager.refreshAccessToken();
        }
      } catch (error) {
        console.error('Error in token listener:', error);
      }
    };

    const intervalId = setInterval(checkToken, interval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [interval]);
};