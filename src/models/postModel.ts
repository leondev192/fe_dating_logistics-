// models/postModel.ts

export interface Post {
  id: string; // Thêm id nếu chưa có
  userId: string;
  postType: 'CargoMatching' | 'LookingForTransport' | 'OfferingTransport';
  status: 'active' | 'completed';
  companyImageUrl?: string;
  companyName?: string;
  origin?: string;
  destination?: string;
  transportGoes?: string;
  transportComes?: string;
  returnTrip?: boolean | null;
  returnTime?: string | null;

  // Fields specific to CargoMatching
  hasVehicle?: boolean | null;
  cargoType?: string;
  cargoWeight?: string | null;
  cargoVolume?: string | null;
  specialRequirements?: string;

  // Fields specific to LookingForTransport
  requiredVehicleType?: string;
  cargoTypeRequest?: string;

  // Fields specific to OfferingTransport
  vehicleType?: string;
  vehicleCapacity?: string | null;
  availableWeight?: string | null;
  pricePerUnit?: string | null;
  vehicleDetails?: string;
}
