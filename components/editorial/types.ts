export type EditorialService = {
  id: string;
  name: string;
  description: string | null;
  priceLabel: string;
  durationLabel: string;
  imageUrl: string | null;
};

export type EditorialBarber = {
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
};
