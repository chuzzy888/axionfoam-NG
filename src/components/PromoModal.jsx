import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Import React Modal

const PromoModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown in the current session
    const modalShown = sessionStorage.getItem("promoModalShown");

    if (!modalShown) {
      // If not shown before in this session, display the modal
      setShowModal(true);
      // Set a flag in sessionStorage to prevent it from showing again in this session
      sessionStorage.setItem("promoModalShown", "true");
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleClose}
      className="promo-modal"
      overlayClassName="promo-modal-overlay"
      ariaHideApp={false} // Optional: Prevent warnings in development
    >
      <button onClick={handleClose} className="close-button">
        &times;
      </button>
      <div className="promo-image-section">
        <img src="cbs.jpeg" alt="Promo Banner" className="promo-img" />
      </div>
    </Modal>
  );
};

export default PromoModal;
