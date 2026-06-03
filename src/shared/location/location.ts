import * as Location from "expo-location";

export type DeviceLocation = {
  latitude: number;
  longitude: number;
};

let configured: boolean | null = null;

async function configureLocation(): Promise<boolean> {
  if (configured !== null) return configured;

  // Request permission from the user
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== Location.PermissionStatus.GRANTED) {
    console.warn("Permission to access location was denied");
    configured = false;
    return false;
  }

  configured = true;
  return true;
}

export async function getLocation(): Promise<DeviceLocation | undefined> {
  const hasPermission = await configureLocation();
  if (!hasPermission) {
    return undefined;
  }

  try {
    let location = await Location.getLastKnownPositionAsync();

    if (!location) {
      location = await Location.getCurrentPositionAsync({});
    }

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return undefined;
  }
}

export async function lookupLocation(
  type: "country" | "city" | "address",
  coords: DeviceLocation,
): Promise<string> {
  try {
    const geocodeResults = await Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    if (geocodeResults.length > 0) {
      const place = geocodeResults[0];
      // Return the city, or fallback to the region/country if city is unavailable
      return place.city || place.region || place.country || "Unknown Location";
    }
  } catch (error) {
    console.error("Reverse geocode failed:", error);
  }

  return "Current Location";
}
