import { memo, useCallback, useEffect, useRef, useState } from 'react';

const ViewItem = ({ viewedItem, isViewedItemVisible, hideViewedItem }) => {
    const [currentImage, setCurrentImage] = useState('');
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
    const [imageScale, setImageScale] = useState(1);

    const refViewItem = useRef(false);
    const refIsDragging = useRef(false);

    const handleImageScroll = useCallback((event) => {
        event.preventDefault();
        setImageScale((prev) => {
            return Math.max(0.1, prev - (event.deltaY / 1000));
        });
    }, []);

    useEffect(() => {
        refViewItem.current.addEventListener('wheel', handleImageScroll, { passive: false })
        
        return () => {
            refViewItem.current.removeEventListener('wheel', handleImageScroll)
        };
    }, [handleImageScroll]);

    useEffect(() => {
        if (viewedItem === '') return;

        setCurrentImage(viewedItem);
        setImagePosition({ x: 0, y: 0 });
        setImageScale(1);
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

    return (
        <section ref={refViewItem}
            className='view-item'
            style={{ visibility: isViewedItemVisible ? 'visible' : 'hidden' }}
            onClick={handleImageClose}
            onMouseMove={handleImageMove}>
            <img style={{
                top: `${imagePosition.y}px`
                , left: `${imagePosition.x}px`
                , transform: `scale(${imageScale})`
            }}
                src={currentImage}
                alt={currentImage || 'viewed item'}
                draggable={false}
                onMouseDown={handleImageMouseDown}
                onMouseUp={handleImageMouseUp}/>
        </section>
    );
};

export default memo(ViewItem);