"use client";
import React, {
    useState,
    createContext,
    useContext,
    ReactNode,
    useCallback
} from 'react';

import { cn } from '@/app/lib/utils'

export type ToastType = "info" | "success" | "error";

interface Toast {
  id: string;
  message: ReactNode;
  type: ToastType;
}

interface ToastContextProps {
    showToast: (msg: ReactNode, opts?:{
        type?: ToastType,
        duration?: number
    }) => void
};

const ToastContext = createContext<ToastContextProps>({
    showToast: () => {}
})

const ToastProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    //find out how to properly pass in type
    const showToast = useCallback( (message: ReactNode, { t = "info", duration = 3000 }={}) => {
        const  id = Date.now().toString()
        const type = t as ToastType
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(()=>{
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration)
    }, 
    [])

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <div className="fixed bottom-4 right-4 flex flex-col space-y-3 z-[9999]">
                {toasts.map((t) => (
                    <div
                    key={t.id}
                    className={cn(
                    "px-4 py-2 rounded shadow text-md text-white",
                    t.type === "info" && "bg-gray-800",
                    t.type === "success" && "bg-green-600",
                    t.type === "error" && "bg-red-600"
                    )}
                >
                    {t.message}
                </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext);
export default ToastProvider;