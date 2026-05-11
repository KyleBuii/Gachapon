import { memo, useCallback, useEffect, useRef, useState } from 'react';

const ViewItem = ({ viewedItem, viewedCredit, isViewedItemVisible, hideViewedItem }) => {
    const [shopItemsView, setShopItemsView] = useState({});

    const [currentImage, setCurrentImage] = useState('');
    const [currentSet, setCurrentSet] = useState('');
    const [currentItem, setCurrentItem] = useState('');

    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
    const [imageScale, setImageScale] = useState(1);

    const [isVideo, setIsVideo] = useState(false);
    const [isOnTop, setIsOnTop] = useState(false);

    const refViewItem = useRef(false);
    const refViewItemButtons = useRef(null);
    const refButtons = useRef([]);
    const refButtonsIndex = useRef(0);
    const refIsDragging = useRef(false);

    let index = 0;

    const handleImageScroll = useCallback((event) => {
        event.preventDefault();
        setImageScale((prev) => {
            return Math.max(0.1, prev - (event.deltaY / 1000));
        });
    }, []);

    useEffect(() => {
        fetch('/shop-items-view.json')
            .then((response) => response.json())
            .then((json) => setShopItemsView(json))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        refViewItem.current.addEventListener('wheel', handleImageScroll, { passive: false })
        
        return () => {
            refViewItem.current.removeEventListener('wheel', handleImageScroll)
        };
    }, [handleImageScroll]);

    useEffect(() => {
        if (viewedItem === '') return;

        const splitViewedItem = viewedItem.split('/');
        setCurrentImage(viewedItem);
        setCurrentSet(splitViewedItem[1]);
        setCurrentItem(splitViewedItem[3]);
        setImagePosition({ x: 0, y: 0 });
        setImageScale(1);
        setIsVideo(false);
    }, [viewedItem]);

    const handleImageClose = () => {
        if (refIsDragging.current) return;
        hideViewedItem();
    };

    const handleImageMouseDown = (event) => {
        refIsDragging.current = true;
        const rect = event.target.getBoundingClientRect();

        setImageOffset({
            x: (event.clientX - rect.left) / imageScale,
            y: (event.clientY - rect.top) / imageScale,
        });
    };

    const handleImageMouseUp = () => {
        setTimeout(() => {
            refIsDragging.current = false;
        }, 0);
    };

    const handleImageMove = (event) => {
        if (!refIsDragging.current) return;

        setImagePosition({
            x: event.clientX - (imageOffset.x * imageScale),
            y: event.clientY - (imageOffset.y * imageScale),
        });
    };

    const handleButton = (event, type, number, index) => {
        event.stopPropagation();

        refButtonsIndex.current = index;

        let newImage = currentImage;
        switch (currentSet) {
            case 'blue-archive': {
                const basePath = `/${currentSet.replace(/\s/g, '-')}/character/${currentItem}/${currentItem}`;
                const newNumber = String(number + 1).padStart(3, '0');

                newImage =
                    (type === 'image')
                        ? `${basePath}-view-${newNumber}.webp`
                        : `${basePath}-view-${type}-${number + 1}.webm`;
                break;
            };
            default: { break; };
        };

        setCurrentImage(newImage);

        const checkVideo = newImage.endsWith('.webm');
        setIsVideo(checkVideo);
    };

    const handleButtonShowOnTop = (event) => {
        event.stopPropagation();
        setIsOnTop((prev) => !prev);
    };

    const handleKeyDown = (event) => {
        const buttons = refButtons.current;
        if (!buttons.length) return;

        if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
            refButtonsIndex.current = Math.min(
                refButtonsIndex.current + 1,
                buttons.length - 1
            );
            buttons[refButtonsIndex.current]?.focus();
            buttons[refButtonsIndex.current]?.click();
        };

        if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
            refButtonsIndex.current = Math.max(
                refButtonsIndex.current - 1,
                0
            );
            buttons[refButtonsIndex.current]?.focus();
            buttons[refButtonsIndex.current]?.click();
        };
    };

    return (
        <section ref={refViewItem}
            className='view-item'
            style={{ visibility: isViewedItemVisible ? 'visible' : 'hidden' }}
            onClick={handleImageClose}
            onMouseMove={handleImageMove}
            onKeyDown={handleKeyDown}>
            {(isVideo)
                ? <video src={currentImage}
                    autoPlay
                    loop
                    muted
                    playsInline/>
                : <img style={{
                    top: `${imagePosition.y}px`
                    , left: `${imagePosition.x}px`
                    , transform: `scale(${imageScale})`
                }}
                    src={currentImage}
                    alt={currentImage || 'viewed item'}
                    draggable={false}
                    onMouseDown={handleImageMouseDown}
                    onMouseUp={handleImageMouseUp}/>}
            <span dangerouslySetInnerHTML={{__html: viewedCredit}}></span>
            {(shopItemsView?.[currentSet.replace(' ', '-')]?.[currentItem] !== undefined)
                ? <div className={`view-item-buttons ${isOnTop ? 'on-top' : ''}`}>
                    <button type='button'
                        className={`button-show-on-top ${isOnTop ? '' : 'disabled'}`}
                        onClick={handleButtonShowOnTop}>Show On Top</button>
                    {Object.entries(
                        shopItemsView?.[currentSet.replace(' ', '-')]?.[currentItem] || {}
                    ).flatMap(([type, count]) => (
                        [...Array(count).keys()].map((number) => {
                            const i = index++;

                            return <button ref={(element) => refButtons.current[i] = element}
                                type='button'
                                onClick={(event) => handleButton(event, type, number, i)}
                                key={`${type} ${number}`}>
                                {type.replace(/^./, (char) => char.toUpperCase())} {number + 1}
                            </button>
                        })
                    ))}
                </div>
                : <></>}
        </section>
    );
};

export default memo(ViewItem);