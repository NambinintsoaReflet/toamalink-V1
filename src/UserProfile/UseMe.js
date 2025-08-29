// src/features/profile/useMe.js
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("/me");
      return data;
      //   ex: {
      //   "token": "1|nOqgGkR9L2aZ4fE8hJ7kP6oN1qS3xY5c",
      //   "user": {
      //     "id": 1,
      //     "name": "Alex Durand",
      //     "email": "alex.durand@example.com",
      //     "avatar_url": "https://example.com/avatars/alex.jpg",
      //     "bio": "Expatrié à Toamasina depuis 2023. J'aime le snorkeling et la cuisine locale.",
      //     "created_at": "2024-05-10T14:30:00.000000Z"
      //   }
      // }
    },
    enabled: true,
  });
}
