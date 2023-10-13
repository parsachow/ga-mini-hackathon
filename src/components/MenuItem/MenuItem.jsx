import './MenuItem.css';
import { Link, useNavigate } from 'react-router-dom';

export default function MenuItem({ showFavIcon, favIconToggled, itemImgUrl, itemImgAlt, itemName, itemDescription, itemPrice, btnText, btnImg, onClick, itemId, tabindex, onToggleFavItem }) {
    const navigate = useNavigate();

    const handleKeyDown = (e) =>{
        if(e.key==="Enter" || e.key===" "){
            navigate(`/menu/${itemId}`);
        }
    }
    return (
        <div className="menu-item-card">
            <div className="imageAndHeart">
                <img  tabIndex={tabindex || 1} src={itemImgUrl} alt={itemImgAlt} className="menu-item-card__img" />
                {
                    showFavIcon &&
                    <div aria-label='add item to favorites' tabIndex={tabindex || 1} className={`menu-item-card__fav-icon${favIconToggled ? "--toggled" : ""}`} onClick={() => onToggleFavItem(itemId)}>

                    </div>
                }
            </div>
            <div tabIndex={tabindex || 1} onKeyDown={handleKeyDown} className="menu-item-card__item" onClick={()=>navigate(`/menu/${itemId}`)}>
                <span tabIndex={tabindex || 1} className="menu-item-card__item__name">
                    {itemName}
                </span>
                <div className="menu-tem-card__item__desc">
                    <div tabIndex={tabindex || 1} className="menu-item-card__item__desc--text">
                        {itemDescription}
                    </div>
                </div>
                <Link to={`/menu/${itemId}`} className='descriptionLink'>Description</Link>
            </div>
            <div className="menu-item-card__price">
                <span tabIndex={tabindex || 1} className="menu-item-card__price--text">${itemPrice.toFixed(2)}</span>
            </div>
            <div className="menu-item-card__btn" onClick={() => onClick(itemId)}>

                {btnImg ?
                    <>
                        <img src={btnImg} tabIndex={tabindex || 1} alt={btnText} className="menu-item-card__btn--text" />
                    </>
                    : <h3 tabIndex={tabindex || 1} className="menu-item-card__btn--text">{btnText}</h3>
                }

            </div>
        </div>
    );
}