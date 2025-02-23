import { memo, useState } from "react";


const maxLengthOption = 6;

const Select = ({ options, optionChange }) => {
    const [currentOption, setCurrentOption] = useState('rarity');
    const handleDropdown = (what) => {
        const elementDropdown = document.getElementById(`${what}-dropdown`);
        elementDropdown.style.display = (elementDropdown.checkVisibility()) ? 'none' : 'flex';
    };
    const handleOptionSelect = (what) => {
        setCurrentOption(what);
        optionChange(what);
    };
    return (
        <section className='select-base'>
            <section className='stick-base'></section>
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
            <section className='button-base'></section>
            <section className='coin-base'>
                <div className='coin-insert'></div>
                <div className='coin-exit'></div>
            </section>
            <section>

            </section>
        </section>
    );
};

export default memo(Select);