import { useEffect, useState } from "react";
import Web3 from "web3";
import { Button, Backdrop, CircularProgress } from "@mui/material";

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

const ReadContract = () => {
  const contractAddress = "0x4B4Bf5D871Cf6eC659F6a16fe9129f8F1EdF27d3";
  const contractABI: any = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "_decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "burnFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "mint",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const OwnerAddress = "0x26F9F0c809779feA862B28a106Fd883fac4a3Fb7";
  const [data, setData] = useState<any>({});
  const [progress, setProgress] = useState(false);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const Contract = new web3.eth.Contract(contractABI, contractAddress);
  const buttonHandler = async () => {
    setProgress(!progress);
    const accountdetails: any = {};
    console.log(Contract);
    accountdetails.Symbol = await Contract.methods
      .symbol()
      .call((err: any, symbol: any) => {
        console.log("symbol", symbol);

        return symbol;
      });
    accountdetails.GetOwner = await Contract.methods
      .getOwner()
      .call((err: any, getowner: any) => {
        console.log("getowner", getowner);

        return getowner;
      });

    accountdetails.Owner = await Contract.methods
      .owner()
      .call((err: any, owner: any) => {
        console.log("owner", owner);

        return owner;
      });

    accountdetails.Name = await Contract.methods
      .name()
      .call((err: any, name: any) => {
        console.log("name", name);

        return name;
      });

    accountdetails.Decimal = await Contract.methods
      .decimals()
      .call((err: any, decimal: any) => {
        console.log("decimals", decimal);

        return decimal;
      });
    accountdetails.TotalSupply = await Contract.methods
      .totalSupply()
      .call((error: any, total: any) => {
        console.log("totalsupply", total);

        return total;
      });
    accountdetails.Balance = await Contract.methods
      .balanceOf(OwnerAddress)
      .call((err: any, bal: any) => {
        console.log("bal", bal);

        return bal;
      });

    console.log(accountdetails);
    await setData(accountdetails);
    await setProgress(false);
  };

  return (
    <div>
      <div className="w-full text-center mt-3">

      <h1 className="font-bold text-xl">Contract Address Details</h1>
      </div>
      <div className="w-full flex justify-center mt-8">
        <Button onClick={buttonHandler} className="bg-black p-4 h-5 mt-14 ml-7">
          ClickMe
        </Button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={progress}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className=" mr-3 border my-2 shadow-2xl ">
          {
            <ol className="mx-2 ">
              <li className="font-semibold ">Balance:{data.Balance}</li>
              <li className="font-semibold ">Symbol:{data.Symbol}</li>
              <li className="font-semibold ">Getowner:{data.GetOwner}</li>
              <li className="font-semibold ">Owner:{data.Owner}</li>
              <li className="font-semibold ">TotalSupply:{data.TotalSupply}</li>
              <li className="font-semibold ">Decimal:{data.Decimal}</li>
              <li className="font-semibold ">Name:{data.Name}</li>
            </ol>
          }
        </div>
      </div>
    </div>
  );
};

export default ReadContract;
