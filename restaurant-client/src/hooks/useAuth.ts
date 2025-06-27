import { AuthContext } from "@/context/AuthContext";
import type { AuthContextType } from "@/types";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  