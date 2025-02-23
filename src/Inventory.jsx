import { memo, useEffect, useState } from "react";
import Select from "./component/Select";


const optionsSort = ['rarity', 'amount', 'set', 'name'];

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('inventory') !== null) {
            setInventory(JSON.parse(localStorage.getItem('inventory')));
        };
    }, []);
    const handleOptionChange = (option) => {
        switch (option) {
            case 'rarity':
                break;
            default: break;
        };
    };
    return (
        <section id='page-inventory'>
            <Select options={optionsSort}
                optionChange={handleOptionChange}/>
            <section className='group-items'>
                {Object.entries(inventory).flatMap((set) => 
                    Object.entries(set[1]).map((item, index) => (
                        <span key={`item ${item[0]} ${index}`}
                            className={`group-item inventory-item ${set[0].replace(/\s/g, '-')}-${item[1].rate}`}
                            style={{ backgroundImage: `url(/${set[0].replace(/\s/g, '-')}/${item[1].rate}-bg.webp)` }}>
                            <img src={`/${set[0].replace(/\s/g, '-')}/inventory/${item[1].type}/${item[0].toLowerCase().replace(/\s/g, '-').replace(/'/g, '')}.webp`}
                                alt={`inventory item ${index}`}
                                loading='lazy'
                                decoding='async'/>
                            <span>{item[0]}</span>
                        </span>
                    ))
                )}
                {/* {inventory.map((item, index) => {
                    return <span key={`item ${index}`}
                        className={`group-item inventory-item ${item[0].replace(/\s/g, '-')}-${item[3]}`}
                        style={{ backgroundImage: `url(/${item[0].replace(/\s/g, '-')}/${item[3]}-bg.webp)` }}>
                        <img src={`/${item[0].replace(/\s/g, '-')}/inventory/${item[1]}/${item[2].toLowerCase().replace(/\s/g, '-').replace(/'/g, '')}.webp`}
                            alt={`inventory item ${index}`}
                            loading='lazy'
                            decoding='async'/>
                        <span>{item[2]}</span>
                    </span>
                })} */}
            </section>
        </section>
    );
};
export default memo(Inventory);