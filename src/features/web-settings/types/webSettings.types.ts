export interface BankDetail {
  bank: string;
  accountType: string;
  accountNumber: string;
  holder: string;
  ruc: string;
}

export interface DeliveryRate {
  city: string;
  cost: number;
}

export interface WebStoreSettings {
  tradeName: string;
  storeBio: string;
  whatsappNumber: string;
  businessPhone: string;
  storeAddress: string;
  city: string;
  country: string;
  mapsUrl: string;
  openingHours: string;
  instagramUrl: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  logoUrl: string;
  footerCopyright: string;
  announcementText: string;
  announcementActive: boolean;
  freeShippingThreshold: number;
  bankDetails: BankDetail[];
  deliveryRates: DeliveryRate[];
}

export interface WebCampaign {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl?: string | null;
  isActive: boolean;
  displayOrder: number;
}
