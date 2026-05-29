import { DeviceMotion, type DeviceMotionMeasurement } from 'expo-sensors';
import { useEffect, useState } from 'react';

export function useDeviceMotion(): DeviceMotionMeasurement | null {
  const [motion, setMotion] = useState<DeviceMotionMeasurement | null>(null);

  useEffect(() => {
    DeviceMotion.setUpdateInterval(100); // 10 times a second

    const subscription = DeviceMotion.addListener((measurement) => {
      setMotion(measurement);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return motion;
}
