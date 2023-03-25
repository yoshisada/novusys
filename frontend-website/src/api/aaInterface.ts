import { useState } from "react";
import crypto from "crypto";
import axios from "axios";
import { useConfig } from "./config";
import { BigNumber, ethers, providers } from "ethers";
import { SimpleAccountAPI } from "@account-abstraction/sdk";
import { walletAbi } from "@/abis/walletAbi";
const aaSdk = require("@account-abstraction/sdk");

interface chainsInfo {
  chain: string;
  id: number;
  logo: string;
  rpc: string;
  test: boolean;
}

interface chains {
  [key: number]: chainsInfo;
}

export const useAAInterface = () => {
  const getUserOpReceipt = async (
    userOpHash: string,
    provider: any,
    entryPoint: string,
    factoryAddress: string,
    sender: string,
    timeout = 30000,
    interval = 5000
  ) => {
    const sw = new SimpleAccountAPI({
      provider,
      entryPointAddress: entryPoint,
      //@ts-ignore
      owner: sender,
      factoryAddress,
    });
    const endtime = Date.now() + timeout;
    const block = await provider.getBlock("latest");
    while (Date.now() < endtime) {
      // @ts-ignore
      const events = await sw.entryPointView.queryFilter(
        // @ts-ignore
        sw.entryPointView.filters.UserOperationEvent(userOpHash),
        Math.max(0, block.number - 100)
      );
      if (events.length > 0) {
        console.log(events[0]);
        return events[0].transactionHash;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    return null;
  };

  const sendTxn = async (
    auth0_id: string,
    target: string,
    value: string,
    data: string,
    providerUrl: string,
    entryPoint: string,
    factory: string,
    cid: number,
    setStatus: Function,
    callback: Function,
    providerRpc: any
  ) => {
    if (
      !(
        auth0_id &&
        target &&
        value &&
        data &&
        providerUrl &&
        entryPoint &&
        factory
      )
    ) {
      return "Error! Missing Provided Data";
    }
    setStatus("processing");
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const options = {
      method: "POST",
      url: "/api/sign/sign",
      params: { "api-version": "3.0" },
      headers: {
        "content-type": "application/json",
      },
      data: [
        {
          auth0_id: auth0_id,
          target: target,
          value: value,
          data: data,
          provider: providerUrl,
          epAddr: entryPoint,
          factoryAddr: factory,
        },
      ],
    };
    axios
      .request(options)
      .then(async function (response) {
        console.log(response.data);
        const chainId = cid;
        const client = await new aaSdk.HttpRpcClient(
          providerUrl,
          entryPoint,
          chainId
        );
        const op = response.data;

        console.log(op);
        const uoHash = await client.sendUserOpToBundler(op);
        callback(
          await getUserOpReceipt(
            uoHash,
            providerRpc,
            entryPoint,
            factory,
            op.sender
          )
        );
      })
      .catch(function (error) {
        console.error(error);
        return error;
      });
  };

  const approveSigners = async (
    auth0_id: string,
    target: string,
    value: string,
    // data: string,
    providerUrl: string,
    entryPoint: string,
    factory: string,
    cid: number,
    callback: Function,
    providerRpc: any,
    signers: any
  ) => {
    if (
      !(
        auth0_id &&
        target &&
        value &&
        // data &&
        providerUrl &&
        entryPoint &&
        factory
      )
    ) {
      return "Error! Missing Provided Data";
    }

    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const walletContract = new ethers.Contract(target, walletAbi, provider);
    const encodedData = walletContract.interface.encodeFunctionData(
      "initializeVoters",
      [
        signers,
      ]
    );
    console.log(encodedData)
    // setStatus("processing");
    // const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const options = {
      method: "POST",
      url: "/api/sign/sign",
      params: { "api-version": "3.0" },
      headers: {
        "content-type": "application/json",
      },
      data: [
        {
          auth0_id: auth0_id,
          target: target,
          value: value,
          data: encodedData,
          provider: providerUrl,
          epAddr: entryPoint,
          factoryAddr: factory,
        },
      ],
    };
    axios
      .request(options)
      .then(async function (response) {
        console.log(response.data);
        const chainId = cid
        const client = await new aaSdk.HttpRpcClient(providerUrl, entryPoint, chainId);
        const op = response.data;

        console.log(op);
        //console.log(BigNumber.from(op.maxFeePerGas).mul(BigNumber.from(1.15)), op.maxFeePerGas)
        const uoHash = await client.sendUserOpToBundler(op);
        callback(
          await getUserOpReceipt(
            uoHash,
            providerRpc,
            entryPoint,
            factory,
            op.sender
          )
        );
      })
      .catch(function (error) {
        console.error(error);
        return error;
      });
  };

  const getOp = async (
    auth0_id: string,
    target: string,
    value: string,
    data: string,
    providerUrl: string,
    entryPoint: string,
    factory: string,
    cid: number,
    callback: Function
  ) => {
    if (
      !(
        auth0_id &&
        target &&
        value &&
        data &&
        providerUrl &&
        entryPoint &&
        factory
      )
    ) {
      return "Error! Missing Provided Data";
    }
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const options = {
      method: "POST",
      url: "/api/sign/sign",
      params: { "api-version": "3.0" },
      headers: {
        "content-type": "application/json",
      },
      data: [
        {
          auth0_id: auth0_id,
          target: target,
          value: value,
          data: data,
          provider: providerUrl,
          epAddr: entryPoint,
          factoryAddr: factory,
        },
      ],
    };
    axios
      .request(options)
      .then(async function (response) {
        console.log(response.data);
        const chainId = await provider.getNetwork().then((net) => net.chainId);
        const client = await new aaSdk.HttpRpcClient(
          providerUrl,
          entryPoint,
          chainId
        );
        const op = response.data;

        callback(op);
      })
      .catch(function (error) {
        console.error(error);
        return error;
      });
  };

  const checkAddress = async (
    address: string,
    provider: any,
    callback: Function
  ) => {
    const code = await provider.getCode(address);
    callback(code);
  };

  const waitTransaction = async (
    hash: string,
    provider: any,
    callback: Function
  ) => {
    console.log("HASH", hash);
    const receipt = await provider.waitForTransaction(hash);
    console.log(receipt);
    callback(receipt);
  };

  return {
    sendTxn,
    getOp,
    checkAddress,
    waitTransaction,
    approveSigners
  };
};

// export default Theme
