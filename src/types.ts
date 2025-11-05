export interface Content {
  id: number;
  title: string;
  body: string;
}
export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  slug: string;

  photo: Media;
  documentId: string;
  content: Content[];
}
export interface News {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  photo: Media | null;
  documentId: string;
  content?: Content[];
  slug: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  position: string;
  photo: Media | null;
  documentId: string;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  text: string;
  photo: Media | null;
  documentId: string;
}

export interface Country {
  id: number;
  code: string;
  name: string;
  participants: number;
  documentId: string;
}

export type MemberSignUpFormValues = {
  company: string;
  phone: string;
  website: string;
  address: string;
  country: string;
  city: string;
  linkedin: string;
  contactName: string;
  contactPosition: string;
  contactEmail: string;
  contactNumber: string;
  startBusinessDate: string;
  markets: string;
  activities: string;
  services: string[];
  profile: string;
  annualTurnover: string;
  employees: string;
  branchOffices: string;
  branchLocations: string;
  references: string;
  companyLogo: string | null;
  banerLogo: string | null;
};

export type MemberData = MemberSignUpFormValues & {
  isApproved: boolean;
  memberId: string;
  companyLogo: string | null;
};

export interface User {
  id: number;
  documentId: string;
  memberId: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  country: string;
  city: string;
  company: string;
  companyRegistrationNumber: string;
  companyLogo?: Media | null;
  banerLogo?: Media | null;
  linkedin: string;
  contactName: string;
  contactPosition: string;
  contactEmail: string;
  contactNumber: string;
  startBusinessDate: string;
  markets: string;
  activities: string;
  services: string[];
  profile: string;
  annualTurnover: string;
  employees: string;
  bankName: string;
  bankAddress: string;
  iban: string;
  swiftCode: string;
  bankAccount: string;
  currency: string;
  invoiceCompanyName: string;
  invoiceCompanyAddress: string;
  showInvoicingDetails: boolean;
  showBankDetails: boolean;
  branchLocations: string;
  branchOffices: string;
  references: string;
  provider: string;
  blocked: boolean;
  confirmed: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  url?: string;
}
