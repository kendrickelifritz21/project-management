import { PropsWithChildren, forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

interface ModalProps extends PropsWithChildren {
  buttonCaption: string
}


const Modal = forwardRef(function Modal({buttonCaption, children}: ModalProps, ref: HTMLInputElement | any) {
  const dialog: HTMLInputElement | any = useRef();
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      }
    }
  });

  const modalRootElement = document.getElementById('modal-root');
  const modalHTML = (
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md w-1/4">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>
  );

  return modalRootElement ? createPortal(modalHTML, modalRootElement): modalHTML;
});

export default Modal;