import './MenuItem.css';
import { Link } from 'react-router-dom';

export default function MenuItem({ showFavIcon, favIconToggled, itemImgUrl, itemImgAlt, itemName, itemDescription, itemPrice, btnText, btnImg, onClick, itemId }) {
    return (
        <div className="menu-item-card">
            <div className="imageAndHeart">
                <img src={itemImgUrl} alt={itemImgAlt} className="menu-item-card__img"/>
                {
                    showFavIcon && 
                    <div className="menu-item-card__fav-icon">
                        
                    </div>
                }
            </div>
            <div className="menu-item-card__item">
                <h3 className="menu-tem-card__item__name">
                    {itemName}
                </h3>
                <div className="menu-tem-card__item__desc">
                    {itemDescription}
                </div>
                <Link to={`/menu/${itemId}`} className='descriptionLink'>Description</Link>
            </div>
            <div className="menu-item-card__price">
                <div className="menu-item-card__price--text">${itemPrice.toFixed(2)}</div>
            </div>
            <div className="menu-item-card__btn" onClick={onClick}>
                
                    {btnImg ?
                        <>
                            <img src={btnImg} alt={btnText} className="menu-item-card__btn--text"/>
                        </>
                        : <h3 className="menu-item-card__btn--text">{btnText}</h3>
                    }
                
            </div>
        </div>
    );
}