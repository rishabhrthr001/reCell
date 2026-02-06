
export type Brand = 'Apple' | 'Samsung' | 'Xiaomi' | 'OnePlus' | 'Google' | 'Nothing';

export interface DeviceModel {
  id: string;
  brand: Brand;
  name: string;
  basePrice: number;
  image: string;
}

export interface SellRequest {
  brand: Brand | null;
  model: DeviceModel | null;
  storage: string | null;
  age: string | null;
  screenCondition: 'excellent' | 'minor' | 'cracked';
  bodyCondition: 'excellent' | 'minor' | 'heavy';
  functionalChecks: {
    touch: boolean;
    speaker: boolean;
    camera: boolean;
    buttons: boolean;
    biometrics: boolean;
    charging: boolean;
  };
  isPoweredOn: boolean;
  batteryHealth: number;
  networkIssues: boolean;
  waterDamage: boolean;
  estimatedPrice: number;
}

export interface InventoryItem {
  id: string;
  brand: Brand;
  name: string;
  storage: string;
  price: number;
  originalPrice: number;
  grade: 'A' | 'B' | 'C';
  image: string;
}
