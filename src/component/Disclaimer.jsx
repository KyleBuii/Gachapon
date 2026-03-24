import { memo, useRef } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const Disclaimer = () => {
    const refDisclaimer = useRef(null);

    const hideDisclaimer = () => {
        refDisclaimer.current.style.display = 'none';
    };

    return (
        <section ref={refDisclaimer}
            className='disclaimer'
            onClick={() => hideDisclaimer()}>
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