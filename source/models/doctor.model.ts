export type DoctorModel = {
    id: number;
    name: string;
    image: string;
    isVerified: boolean;
    gender: string;
    averageRating: number;
    totalVotes: number;
    address: string;
    firstAvailableAppointment: string;
    brief: string;
    degree: string;
    expertise: string;
    badges: string[];
    educationalLevel: string;
    visitFee : number
}

export interface TreeNodeType {
  id: number;
  label: string;
  children?: TreeNodeType[];
}