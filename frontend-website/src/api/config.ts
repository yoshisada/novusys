import { useState } from "react";

interface chainsInfo {
  chain: string;
  id: number;
  logo: string;
  rpc: string;
  bundler: string;
  factory: string;
  entryPoint: string;
  test: boolean;
  pm: boolean,
}

interface chains {
  [key: number]: chainsInfo;
}

export const useConfig = () => {
  const chains: chains = {
    1: {
      chain: "Ethereum",
      id: 1,
      logo: "./logos/chains/ethereum.png",
      rpc: "https://eth.llamarpc.com",
      entryPoint: "",
      bundler: "",
      factory: "",
      test: false,
      pm: false,
    },
    137: {
      chain: "Polygon",
      id: 137,
      logo: "./logos/chains/polygon.png",
      rpc: "https://polygon.llamarpc.com",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: false,
      pm: false,
    },
    10: {
      chain: "Optimism",
      id: 10,
      logo: "./logos/chains/optimism.png",
      rpc: "https://mainnet.optimism.io",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: false,
      pm: false,
    },
    324: {
      chain: "zKSync Era",
      id: 324,
      logo: "./logos/chains/zksync.png",
      rpc: "https://zksync2-mainnet.zksync.io",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: false,
      pm: false,
    },
    5: {
      chain: "Ethereum Goerli",
      id: 5,
      logo: "./logos/chains/ethereum.png",
      rpc: "https://eth-goerli.public.blastapi.io",
      entryPoint: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
      factory: "0x2bC52aEd814Ee695c9FD7B7EB4F8B9821E710ceF",
      bundler: "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071",
      test: true,
      pm: false,
    },
    420: {
      chain: "Optimism Goerli",
      id: 420,
      logo: "./logos/chains/optimism.png",
      rpc: "https://chainid.link/?network=optimism-goerli",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: true,
      pm: false,
    },
    80001: {
      chain: "Polygon Mumbai",
      id: 80001,
      logo: "./logos/chains/polygon.png",
      rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: true,
      pm: false,
    },
    280: {
      chain: "zKSync Era Testnet",
      id: 280,
      logo: "./logos/chains/zksync.png",
      rpc: "https://zksync2-testnet.zksync.dev",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: true,
      pm: false,
    },
  };

  return {
    chains,
  };
};

// export default Theme
