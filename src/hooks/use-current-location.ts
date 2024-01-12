import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useCurrentLocation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLocation = useCallback(async () => {
    setIsLoading(true);

    let lat = 0,
      lon = 0;

    if (navigator.geolocation) {
      try {
        const position: GeolocationPosition = await new Promise(
          (resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        lat = position.coords.latitude;
        lon = position.coords.longitude;
      } catch (error) {
        console.error('Error getting user location:', error);
        toast.error(
          'We could not get your location. Please reset your permissions'
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
    return { lat, lon };
  }, []);

  return { isLoading, getLocation };
};
