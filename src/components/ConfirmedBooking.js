import React from "react";
import Logo from '../assets/image_assets/logo_small.png'

const ConfimredBooking = () => {
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
export default ConfimredBooking