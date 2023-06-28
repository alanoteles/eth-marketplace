import useSWR from "swr";
import {useEffect} from "react";

const NETWORKS = {
  1: "Ethereum Main Network",
  5: "Goerli Test Network",
  1337: "Ganache",
  59140: "Linea Goerli Test Network",
  11155111:"Sepolia Test Network"
}


export const handler = (web3, provider) => () => {

  const { mutate, ...rest } = useSWR(() =>
    web3 ? "web3/network" : null,
    async () => {
      const chainId = await web3.eth.getChainId()
      return NETWORKS[chainId]
    }
  )

  useEffect(() => {
    provider &&
      provider.on("chainChanged", chainId => {
        mutate(NETWORKS[parseInt(chainId, 16)])
      })
  }, [web3])

  return {
    network: {
      mutate,
      ...rest
    }
  }
}