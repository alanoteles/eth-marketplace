import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0xb85a349e16b6dead2401cfcdf0e5a30880ccb56c4a59adb630a09d0e10cf6bbd": true
}
export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null ,
    async  () => {
        const accounts = await web3.eth.getAccounts()
        return accounts[0]
      }
  )

  useEffect(() => {
    provider &&
    provider.on("accountsChanged",
        accounts => mutate(accounts[0] ?? null))
  },[provider])

  return {
      data,
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest
  }
}