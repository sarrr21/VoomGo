import { useEffect } from "react";
import { useAuthStore } from "../stores/auth.store";

export function AuthHydrator() {
  const hydrate = useAuthStore((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return null;
}


