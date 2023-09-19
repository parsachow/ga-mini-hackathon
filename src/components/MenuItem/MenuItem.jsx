import './MenuItem.css';

export default function MenuItem({ showFavIcon, favIconToggled, itemImgUrl, itemImgAlt, itemName, itemDescription, itemPrice, btnText, btnImg, onClick }) {
    return (
        <div className="menu-item-card">
            <div className="menu-item-card__img">
                <img src={itemImgUrl} alt={itemImgAlt} />
                {
                    showFavIcon && 
                    <div className="menu-item-card__fav-icon">
                        
                    </div>
                }
            </div>
            <div className="menu-item-card__item">
                <div className="menu-tem-card__item__name">
                    {itemName}
                </div>
                <div className="menu-tem-card__item__desc">
                    {itemDescription}
                </div>
            </div>
            <div className="menu-item-card__price">
                <div className="menu-item-card__price--text">${itemPrice}</div>
            </div>
            <div className="menu-item-card__btn" onClick={onClick}>
                <div className="menu-item-card__btn--text">
                    {btnImg ?
                        <>
                            <img src={btnImg} alt={btnText} />
                        </>
                        : btnText
                    }
                </div>
            </div>
        </div>
    );
}