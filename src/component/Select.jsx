import { memo, useCallback, useEffect, useRef, useState } from "react";


const maxLengthOption = 6;
let isMobile = false;

const Select = ({ options, optionChange, buttonPress, coinInsert, defaultOption = options[0] }) => {
    const [currentOption, setCurrentOption] = useState(defaultOption);
    const [dragging, setDragging] = useState(false);
    const refJoystickStick = useRef(null);
    const refJoystickNeck = useRef(null);
    useEffect(() => {
        if ('maxTouchPoints' in navigator) {
            isMobile = navigator.maxTouchPoints > 0;
        };
        return () => {
            document.removeEventListener('mousemove', handleJoystickDragging);
            document.removeEventListener('touchmove', handleJoystickDragging);
        };
    }, []);
    const handleJoystick = () => {
        if (!dragging) {
            document.addEventListener('mousemove', handleJoystickDragging);
        } else {
            document.removeEventListener('mousemove', handleJoystickDragging);
            refJoystickStick.current.style.top = '-1rem';
            refJoystickStick.current.style.left = '0rem';
        };
        setDragging((prev) => !prev);
    };
    const handleJoystickMobile = () => {
        if (!refJoystickStick.current) return;
        document.addEventListener('touchmove', handleJoystickDragging);
    };
    const handleJoystickMobileTouchEnd = () => {
        if (!refJoystickStick.current) return;
        document.removeEventListener('touchmove', handleJoystickDragging);
        refJoystickStick.current.style.top = '-1rem';
        refJoystickStick.current.style.left = '0rem';
    };
    const handleJoystickDragging = useCallback((event) => {
        if (!refJoystickStick.current || !refJoystickNeck.current) return;
        const elementSelectBase = document.querySelector('.select-base').getBoundingClientRect();
        if (isMobile) {
            const touch = event.touches[0];
            refJoystickStick.current.style.left = `${touch.clientX - elementSelectBase.left - 32}px`;
            refJoystickStick.current.style.top = `${touch.clientY - elementSelectBase.top - 40}px`;
        } else {
            refJoystickStick.current.style.left = `${event.clientX - elementSelectBase.left - 32}px`;
            refJoystickStick.current.style.top = `${event.clientY - elementSelectBase.top - 40}px`;
        };
    }, []);
    const handleDropdown = (what) => {
        const elementDropdown = document.getElementById(`${what}-dropdown`);
        elementDropdown.style.display = (elementDropdown.checkVisibility()) ? 'none' : 'flex';
    };
    const handleOptionSelect = (what) => {
        setCurrentOption(what);
        optionChange(what);
    };
    const handleButtonPress = () => {
        const elementButton = document.querySelector('.button-base');
        if (elementButton.classList.contains('flipped')) {
            elementButton.classList.remove('flipped');
            buttonPress('descending');
        } else {
            elementButton.classList.add('flipped');
            buttonPress('ascending');
        };
    };
    const handleCoinInsert = () => {
        coinInsert();
    };
    return (
        <section className='select-base'>
            <section className='joystick-base'>
                <span ref={refJoystickStick}
                    className='joystick-stick'
                    onClick={() => handleJoystick()}
                    onTouchStart={() => handleJoystickMobile()}
                    onTouchEnd={() => handleJoystickMobileTouchEnd()}></span>
                <span ref={refJoystickNeck}
                    className='joystick-neck'></span>
            </section>
            <section className='option-base'
                onClick={() => handleDropdown('option')}>
                <div>
                    <span className='additional'>{'0'.repeat(maxLengthOption - currentOption.length)}</span>
                    <span>{currentOption.replace(/^./, (char) => char.toUpperCase())}</span>
                </div>
                <div id='option-dropdown'
                    className='dropdown'>
                    {options.map((option) => {
                        let optionReformatted = option.replace(/^./, (char) => char.toUpperCase());
                        let optionAdditional = '0'.repeat(maxLengthOption - option.length);
                        return <div key={option}
                            onClick={() => handleOptionSelect(option)}>
                            <span className='additional'>{optionAdditional}</span>
                            <span>{optionReformatted}</span>
                        </div>
                    })}
                </div>
            </section>
            <section className='button-base'
                onClick={() => handleButtonPress()}></section>
            <section className='coin-base'
                onClick={() => handleCoinInsert()}>
                <div className='coin-insert'></div>
                <div className='coin-exit'></div>
            </section>
        </section>
    );
};

export default memo(Select);