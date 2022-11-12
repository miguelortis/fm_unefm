import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
    
    const fetchData = async () => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log({ response });
        return response;  
      }

const message = {
      // Default
    default: (text) => toast(text),
  
    // Success
    success: (text) => toast.success(text),
  
    // Error
    error: (text) => toast.error(text),

    // warning
    warning: (text) => toast.warning(text),
  
    // Promise
    
    PromiseNotify: () =>  toast.promise(
      fetchData(),
      {
        loading: 'loading...',
        success: 'Successfully get data',
        error: "error occurs in data",
      }
    ),
  
    // Emoji or icon
    IconNotify: () => toast('Good Job!', {
      icon: '👏',
    })
    }
    export default message