// src/apis/models/userModel.ts
export interface UpdateUserRequest {
  phone?: string;
  companyName?: string;
  address?: string;
  businessCode?: string;
  taxCode?: string;
  representativeName?: string;
  representativeUrl?: string;
  profilePictureUrl?: string;
}
