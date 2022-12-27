import { Button } from "@mui/material";
import React ,{ ChangeEvent, FormEvent, useContext } from "react";
import { TransactionContext } from "./writecontract";

const TransactionContract = () => {
  const { Account, ConnectToAccount ,onHandleChange,formData,sendTransaction} = useContext<any>(TransactionContext);

  const submithandler=(e:FormEvent)=>{
    e.preventDefault()
    const {recipient,amount}=formData
    if(!recipient||!amount){
        return
    }else{
          sendTransaction()
    }
  }
   const handleChange=(e:FormEvent<HTMLInputElement>)=>{
    onHandleChange(e,e.currentTarget.name)
   }
  
  return (
    <div>
        <div className="w-full text-center mt-3">

        <h1 className="font-bold text-xl">Transaction </h1>
        </div>
      <div className="w-full flex justify-center mt-8">
        {Account.length > 0 ? (<>
       
          <div>
            <form onSubmit={submithandler}>
                <div>
                <label className="font-bold text-xl">Receptent ADDress :</label> 

                <input type={'text'} name={'recipient'} onChange={handleChange} className='border p-3 rounded-lg'/>
                </div>
                <div className="mt-3">
                    <label className="font-bold text-xl">Amount :</label>
                    <input type={'number'} step='0.0001' name={'amount'} onChange={handleChange} className='border p-3 rounded-lg ml-20'/>
                </div>
                <button className="mt-5 ml-32 bg-cyan-500 p-3 rounded-full">Submit</button>

            </form>
          </div>
          </>
        ) : (
          <>
            <Button onClick={ConnectToAccount}>ConnectWallet</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(TransactionContract) 