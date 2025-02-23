import { memo } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const Disclaimer = () => {
    const hideDisclaimer = () => {
        const elementDisclaimer = document.getElementById('disclaimer');
        elementDisclaimer.style.display = 'none';
    };
    return (
        <section id='disclaimer'
            className='popup'
            onClick={() => hideDisclaimer()}>
            <span>x</span>
            <span>
                <FaExclamationTriangle/>
                    Disclaimer
                <FaExclamationTriangle/>
            </span>
            <span>All product names, logos, characters, brands, trademarks and registered trademarks are property of their respective owners and unrelated to Gachapon.</span>
        </section>
    );
};

export default memo(Disclaimer);