"use client";

import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div>
      <div>
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
