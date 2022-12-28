import Web3 from "web3";
import { ethers, Signer } from "ethers";

import { Button } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

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

const contractAddress = "0x4B4Bf5D871Cf6eC659F6a16fe9129f8F1EdF27d3";

const { ethereum }: any = window;

export const TransactionContext = createContext({});
export const CreateEthereumContract = () => {
  const provider =new ethers.providers.Web3Provider(ethereum);
  //  await provider.send('eth_requestAccounts',[])
  
   const signer= provider.getSigner()
  const Contract = new ethers.Contract(contractAddress,contractABI,signer);
  const signeraddress=signer.getAddress()
  console.log(Contract,signeraddress);
  
  return Contract;
};

const ContractProvider = ({ children }: any) => {
  const [Account, setAccount] = useState([]);
  const [formData,setFormData]=useState<any>({recipient:'',amount:''})
  const [isLoading,setIsLoading]=useState(false)

 const onHandleChange=(e:any,name:any)=>{
    setFormData((prevState:any)=>({...prevState,[name]:e.target.value}))
 }
  const CheckIfAccountExists = async () => {
    try {
      if (!ethereum) {
        return console.log("please install metamask");
      } else {
        const account = await ethereum.request({ method: "eth_accounts" });
        if (account.length) {
          setAccount(account[0]);
          console.log(account[0]);
        } else {
          return console.log("no account founded");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ConnectToAccount = async () => {
    try {
      if (!ethereum) {
        return console.log("please install metamask ");
      } else {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(account[0]);

        setAccount(account[0]);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction=async()=>{
    try {
        
        if(ethereum){
            const {recipient,amount}=formData
            const contract=CreateEthereumContract()          
            const parsedAmount= ethers.utils.parseEther(amount)
            const data=await contract.transfer(recipient,parsedAmount)
            console.log(data);
            
          //  await ethereum.request({
          //       method:'eth_sendTransaction',
          //       params:[{
          //           from:Account,
          //           to:contractAddress,
          //           gas:'0x5208',
          //           data:data
          //       }]
          //   })            
            const transactionHash = data.hash
            console.log(transactionHash);
            alert (`Success ... ${transactionHash}`)
            
        }else{
            return console.log('no ethereum object');
        }
    } catch (error) {
        console.log(error);
        
    }

  }
  useEffect(() => {
    CheckIfAccountExists();
  }, [Account]);

  return (
    <div>
      {
        <TransactionContext.Provider value={{ Account, ConnectToAccount,onHandleChange,formData,sendTransaction}}>
          {children}
        </TransactionContext.Provider>
      }
    </div>
  );
};
export default ContractProvider;
