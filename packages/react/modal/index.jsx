'use client';

import {
  Fragment,
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';

const default_body_overflow_value = (typeof window !== 'undefined' && window.document.body.style.overflow) || 'auto';

export const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children, createPortal }) => {
  const [modals, setModals] = useState([]);

  const openModal = useCallback((modal) => {
    setModals((modals) => [...modals, modal]);
  }, []);

  const closeModal = useCallback(() => {
    setModals((modals) =>
      modals.filter((_, index) => index + 1 !== modals.length),
    );
  }, []);

  useEffect(() => {
    if (modals.length === 0) {
      document.body.style.overflow = default_body_overflow_value;
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [modals]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      {modals.map((modal, index) => (
        <Fragment key={`modal-${index}`}>
          {createPortal(modal, document.body)}
        </Fragment>
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = (Modal, modalProps = {}) => {
  const { openModal } = useContext(ModalContext);

  const open = useCallback((props) => {
    openModal(<Modal {...props} {...modalProps} />);
  }, []);

  return {
    open,
  };
};

export const useCloseModal = () => {
  const { closeModal } = useContext(ModalContext);
  return closeModal;
};
