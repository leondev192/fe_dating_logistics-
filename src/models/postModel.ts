// models/postModel.ts

export interface Post {
  postType: 'CargoMatching' | 'LookingForTransport' | 'OfferingTransport';
  status: 'Active' | 'Completed';
  companyImageUrl?: string;
  companyName?: string;
  origin?: string;
  destination?: string;
  transportTime?: string;
  returnTrip?: boolean | null;
  returnTime?: string | null;

  // Fields specific to CargoMatching
  hasVehicle?: boolean | null;
  cargoType?: string;
  cargoWeight?: number | null;
  cargoVolume?: number | null;
  specialRequirements?: string;

  // Fields specific to LookingForTransport
  requiredVehicleType?: string;
  cargoTypeRequest?: string;

  // Fields specific to OfferingTransport
  vehicleType?: string;
  vehicleCapacity?: number | null;
  availableWeight?: number | null;
  pricePerUnit?: number | null;
  vehicleDetails?: string;
}
