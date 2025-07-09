import { useEffect,useState } from 'react';


const Qr = () => {


    const [time, setTime] = useState(180);

    useEffect(() => {
      if (time === 0) return;
  
      const timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000); 
  
      return () => clearInterval(timer); 
    }, [time]);


  return (
    <div className='flex justify-center'>
    <img className = 'w-32' src="QR.svg" alt=""/> 
    <div className='flex flex-col items-center gap-1'>
      <div className='pt-17 text-sm text-gray-700'>남은시간</div>
      <div className=''>{time}</div>
    </div>
    </div>

)
}

export default Qr


