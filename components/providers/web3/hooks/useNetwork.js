import useSWR from "swr";
import {useEffect} from "react";

const NETWORKS = {
  1: "Ethereum Main Network",
  5: "Goerli Test Network",
  1337: "Ganache",
  59140: "Linea Goerli Test Network",
  11155111:"Sepolia Test Network"
}

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]

export const handler = (web3, provider) => () => {

  let isLoading = true
  let isSupported = false

  const { data, error, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/network" : null,
    async () => {
      console.log("data: ", data)
      console.log("error: ", error)
      const chainId = await web3.eth.getChainId()
      isLoading = false
      return NETWORKS[chainId]
    }
  )

  console.log("isLoading: ", isLoading)
  console.log("error2: ", !error)

  useEffect(() => {
    provider &&
      provider.on("chainChanged", chainId => {
        mutate(NETWORKS[parseInt(chainId, 16)])
      })
  }, [web3])

  // debugger
  return {
    network: {
      data,
      hasFinishedFirstFetch: data || error,
      mutate,
      target: targetNetwork,
      isSupported: data === targetNetwork,
      ...rest
    }
  }
}