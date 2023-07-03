
import { useHooks } from "@components/providers/web3";

const enhanceHook = swRes => {
  return {
    ...swRes,
    hasInitialResponse: swRes.data || swRes.error
  }
}

export const useNetwork = () => {
  const swRes = enhanceHook(useHooks(hooks => hooks.useNetwork)())
  return {
    network: swRes
  }
}

export const useAccount = () => {
  const swRes =  enhanceHook(useHooks(hooks => hooks.useAccount)())
  return {
    account: swRes
  }
}