
export type UserRole = 'buyer' | 'creator' | 'both' | 'admin';

export type AppUser=  {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string;
    role: UserRole;
    isOnline: boolean;
    joinDate: string;

    // Creator specific
    speciality?: string;
    rating?: number;
    artworks?: number;
    followers?: string;

    // Buyer specific
    purchases?: number;
    totalSpent?: number;

    // Common
    balance: {
      usd: number;
      glory: number;
      usdc: number;
      sol: number;
    };
  } 