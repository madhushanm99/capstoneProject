import React from "react";
import Logo from '../assets/image_assets/Logo.png'

const ConfimredBooking = () => {
    return (
        <div className="Confirm">
            <section className="LL-BookingConfirmation">
                <Logo
                    src={logo} 
                    alt="logo"
                    height="100px"
                    width="fit-content"
                />
                <Heading size="xl">Booking Confirmed</Heading>
                <p>
                    We are pleased to inform you that your reservation request has been
                    received and confirmed.
                </p>
            </section>F
        </div>
    );

};
export default ConfimredBooking