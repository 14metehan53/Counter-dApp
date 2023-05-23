import useWeb3 from '@/hooks/useWallet';
import { useEffect, useState } from 'react';
import useCounterFunc from '@/hooks/useCounterFunctions';

export default function Home() {
  const { wallet } = useWeb3();
  const { increase, value, viewValue, decrease, reset } = useCounterFunc();

  useEffect(() => {
    if (wallet.address) {
      viewValue();
    }
  }, [wallet.address]);

  return (
    <>
      {wallet.address ? (
        <>
          <div className='address'>{wallet.address}</div>
          <div>Number : {value}</div>
          <div className='buttons'>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
            <button onClick={reset}>Reset</button>
          </div>
        </>
      ) : (
        <button className='address' onClick={wallet.connect}>
          Connect Wallet
        </button>
      )}
    </>
  );
}
