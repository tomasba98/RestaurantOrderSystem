
import { Roles } from "@/domain/entities/User";
import { useAuth } from "./useAuth";


export const useRoleCheck = () => {
    const { hasRole, hasAnyRole, user } = useAuth();
    
    return {
      isAdmin: hasRole(Roles.Admin),
      isManager: hasRole(Roles.Manager),
      isWaiter: hasRole(Roles.Waiter),
      isKitchen: hasRole(Roles.Kitchen),
      isStaff: hasAnyRole([Roles.Manager, Roles.Waiter, Roles.Kitchen]),
      canManageUsers: hasAnyRole([Roles.Admin, Roles.Manager]),
      canManageProducts: hasAnyRole([Roles.Admin, Roles.Manager]),
      canTakeOrders: hasAnyRole([Roles.Waiter, Roles.Manager]),
      canViewKitchen: hasAnyRole([Roles.Kitchen, Roles.Manager]),
      currentRole: user?.role,
    };
  };