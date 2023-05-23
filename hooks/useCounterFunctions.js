import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import useContract from './useContract';
import { counteraddress } from '@/config';
import counterJson from '../artifacts/contracts/Counter.sol/Counter.json';

const useCounterFunc = () => {
  const [value, setValue] = useState(0);

  const counterContract = useContract(counteraddress, counterJson.abi);

  const increase = async () => {
    const txn = await counterContract.increase();
    await txn.wait();
    viewValue();
  };

  const decrease = async () => {
    const txn = await counterContract.decrease();
    await txn.wait();
    viewValue();
  };

  const viewValue = async () => {
    const value = await counterContract.viewValue();
    setValue(value.toNumber());
  };

  const reset = async () => {
    const txn = await counterContract.reset();
    await txn.wait();
    viewValue();
  };

  return {
    increase,
    decrease,
    viewValue,
    value,
    reset,
  };
};

export default useCounterFunc;
