import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Logo from '../assets/image_assets/logo_small.png';

const ConfirmedBooking = () => {
  useEffect(() => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Booking Confirmed",
      text: "We are pleased to inform you that your reservation request has been received and confirmed.",
      icon: "success",
      confirmButtonText: "OK",
      reverseButtons: true,
    }).then((result) => {
      // Redirect to the home page after the user clicks "OK"
      if (result.isConfirmed) {
      window.location.replace("/");
    }
    });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="comfirm">
      <section className="LL-BookingConfirmation">
        <img
          src={Logo}
          alt="logo"
          height="100px"
          width="fit-content"
        />
        <h1 size="xl">Booking Confirmed</h1>
        <p>
          We are pleased to inform you that your reservation request has been
          received and confirmed.
        </p>
      </section>
    </div>
  );
};

export default ConfirmedBooking;
