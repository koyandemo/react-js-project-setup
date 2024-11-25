import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

export const passwordHint = '**********';

export function classNames(...classes: string[] | Object[]) {
  return classes.filter(Boolean).join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//@typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, delay: number) => {
  let id: NodeJS.Timeout;
  return () => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      fn();
    }, delay);
  };
};


export const generateSizeForInput = (size: 'sm' | 'lg' | 'full') => {
  return size === 'sm'
    ? 'w-[137px] h-[32px]'
    : size === 'lg'
    ? 'w-[233px] h-[49px]'
    : 'w-full h-[49px]';
};


export const readFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};


export const generateLeaseRequireMsg = (name: string, length: number) => {
  return `${name} must be at lease ${length} characters!`;
};

export const generateGtMsg = (name:string,value:number) => {
  return `${name} must be greater than ${value} !`;
}

export const limitTime = 3000;

export type toastObjType = {
  position: 'top-center';
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: string;
};

const toastObj: toastObjType = {
  position: 'top-center',
  autoClose: limitTime,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'colored',
};

export const toastMessage = (
  type: string,
  message: string,
  disabledClose?: boolean
) => {
  if (type === 'error') {
    return toast.error(message, {
      ...toastObj,
      autoClose: disabledClose ? false : limitTime,
    });
  }
  if (type === 'success') {
    return toast.success(message, { ...toastObj });
  }
  if (type === 'warn') {
    return toast.warn(message, { ...toastObj });
  } else {
    return null;
  }
};


export default function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    if(error.response?.data?.data){
      return error.response?.data?.data
    }
    // if (
    //   error.response?.data?.data &&
    //   Object.keys(error.response?.data?.data).length > 0
    // ) {
    //   const err = error.response.data.data;
    //   const keys = Object.keys(err);
    //   const firstKey = keys[0];
    //   const firstError = err[firstKey];
    //   return firstError[0];
    // }

    if (error.response?.data?.message) {
      return error.response?.data.message;
    } else return error.message;
  } else if (error instanceof Error) return error.message;
  else return 'Unexpected error. Try again later';
}


export const generateValueHint = (value:string,length:number) => {
  if(value.length < length){
    return value;
  }else{
    return value.slice(0,length).concat("...")
  }
}


export const generateEmailHint = (value:string) => {
  const email = value.split('@')[0]
  const domain = value.split('@')[1];

  if(email.length < 5){
    return email.concat(domain)
  }else{
    return email.slice(0,5).concat("...").concat('@').concat(domain);
  }
}



export const generateFromToDate = (date:DateRange | undefined) => {
  if(date?.from && date?.to){
    return {
      fromDate : format(date.from,"yyyy-MM-dd"), 
      toDate: format(date.to,"yyyy-MM-dd")
    }
  }else{
    return {
      fromDate : '',
      toDate : ''
    }
  }
}


export const generateOrderStatusColor = (status:number) => {
  switch(status){
    case 0: return "bg-yellow-500"
    case 1: return "bg-blue-500"
    case 2: return "bg-green-500"
    // case 3: return "bg-Failed-500"
  }
}

export const generateOrderStatus = (status:number) => {
  console.log(status);
  switch(status){
    case 0: return "Pending"
    case 1: return "Shipping"
    case 2: return "Complete"
    // case 3: return "Failed"
  }
}