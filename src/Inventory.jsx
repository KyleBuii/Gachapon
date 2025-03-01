import { memo, useEffect, useState } from "react";
import Select from "./component/Select";


let initialInventory = {};
let sets = [];
let currentSetIndex = 0;
const optionsSort = [
    'amount',
    'name',
    'rarity',
    'latest',
];

const Inventory = ({ inventory }) => {
    const [modifiedInventory, setModifiedInventory] = useState([]);
    const [currentOption, setCurrentOption] = useState('latest');
    const [sortOrder, setSortOrder] = useState('descending');
    useEffect(() => {
        if (Object.keys(inventory).length !== 0) {
            const inventorySets = Object.keys(inventory);
            initialInventory = {
                ...inventory
            };
            sets = [...inventorySets];
            setModifiedInventory(inventory[inventorySets[currentSetIndex]])
        };
    }, []);
    const handleSelectOptionChange = (option) => {
        if (Object.keys(initialInventory).length === 0) return;
        setCurrentOption(option);
        setModifiedInventory(sortInventory(modifiedInventory, option));
    };
    const handleSelectButtonPress = (order) => {
        if (Object.keys(initialInventory).length === 0) return;
        setSortOrder(order);
        setModifiedInventory(Object.fromEntries(
            Object.entries(modifiedInventory).reverse()
        ));
    };
    const handleSelectCoinInsert = () => {
        if (Object.keys(initialInventory).length === 0) return;
        let calculateSetIndex = currentSetIndex + 1;
        if (calculateSetIndex > sets.length - 1) {
            calculateSetIndex = 0;
        };
        currentSetIndex = calculateSetIndex;
        const newInventory = sortInventory(initialInventory[sets[calculateSetIndex]], currentOption);
        setModifiedInventory(newInventory);
    };
    const sortInventory = (originalInventory, sortMethod) => {
        let changedInventory = [];
        switch (sortMethod) {
            case 'amount':
                changedInventory = Object.entries(originalInventory)
                    .sort(([, itemOne], [, itemTwo]) => itemTwo.count - itemOne.count);
                break;
            case 'name':
                changedInventory = Object.entries(originalInventory).sort().reverse();
                break;
            case 'rarity':
                changedInventory = Object.entries(originalInventory)
                    .sort(([, itemOne], [, itemTwo]) => itemTwo.rate - itemOne.rate);
                break;
            case 'latest':
                changedInventory = Object.entries(initialInventory[sets[currentSetIndex]]);
                break;    
            default: break;
        };
        if (sortOrder === 'ascending') {
            changedInventory.reverse();
        };
        return Object.fromEntries(changedInventory);
    };
    return (
        <section id='page-inventory'>
            <Select options={optionsSort}
                defaultOption={'latest'}
                optionChange={handleSelectOptionChange}
                buttonPress={handleSelectButtonPress}
                coinInsert={handleSelectCoinInsert}/>
            <section className='group-items'>
                {(modifiedInventory !== undefined)
                    && Object.entries(modifiedInventory).map((item, index) => (
                        <span key={`item ${item[0]} ${index}`}
                            className={`group-item inventory-item ${sets[currentSetIndex].replace(/\s/g, '-')}-${item[1].rate}`}
                            style={{ backgroundImage: `url(/${sets[currentSetIndex].replace(/\s/g, '-')}/${item[1].rate}-bg.webp)` }}>
                            <span className='item-count'>{item[1].count}</span>
                            <img src={`/${sets[currentSetIndex].replace(/\s/g, '-')}/inventory/${item[1].type}/${item[0].toLowerCase().replace(/\s/g, '-').replace(/'/g, '')}.webp`}
                                alt={`inventory item ${index}`}
                                loading='lazy'
                                decoding='async'/>
                            <span className='item-name'>{item[0]}</span>
                        </span>
                    ))
                }
            </section>
        </section>
    );
};
export default memo(Inventory);