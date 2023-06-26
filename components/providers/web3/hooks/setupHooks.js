
import { handler as createUserAccount } from "./useAccount";

export const setupHooks = (...deps) => {
  return {
    useAccount: createUserAccount(...deps)
  }
}