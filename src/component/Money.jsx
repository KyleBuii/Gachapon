import { memo, useState } from "react";

const Money = ({ money }) => {
    const formatNumber = (number, digits) => {
        const lookup = [
            { value: 1,    symbol: ''  },
            { value: 1e3,  symbol: 'K' },
            { value: 1e6,  symbol: 'M' },
            { value: 1e9,  symbol: 'G' },
            { value: 1e12, symbol: 'T' },
            { value: 1e15, symbol: 'P' },
            { value: 1e18, symbol: 'E' }
        ];
        const regexDecimals = new RegExp(`^-?\\d+(?:\\.\\d{0,${digits}})?`);
        const regex = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
        const item = lookup.findLast(item => number >= item.value);
        return (item)
            ? (number / item.value)
                .toString()
                .match(regexDecimals)[0]
                .replace(regex, '')
                .concat(item.symbol)
            : '0';
    };
    return (
        <section id='money'>${formatNumber(money, 2)}</section>
    );
};

export default memo(Money);