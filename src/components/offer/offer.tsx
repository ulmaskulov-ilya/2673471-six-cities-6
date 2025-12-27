import {Link} from 'react-router-dom';
import {memo} from 'react';
import cn from 'classnames';
import {AppRoute, getStars} from '../../const.ts';
import {OfferType} from '../../types/offer.type.ts';
import {useAppDispatch} from '../../hooks';
import {postFavoriteAction} from '../../store/api-actions.ts';

export type OfferBlockStyle = 'cities' | 'near-places' | 'favorites';
export type OfferImageSize = 'small' | 'large';
type OfferProps = {
  offer: OfferType;
  block: OfferBlockStyle;
  sizeImage: OfferImageSize;
  onCardHover: (offerId: OfferType['id'] | null) => void;
}
const sizeImageRecord: Record<OfferImageSize, { width: string; height: string }> = {
  small: {width: '150', height: '110'},
  large: {width: '260', height: '200'}
};

function Offer({offer, block, sizeImage, onCardHover}: OfferProps) {
  const dispatch = useAppDispatch();
  const handleFavoriteClick = () => {
    dispatch(postFavoriteAction({
      offerId: offer.id,
      status: offer.isFavorite ? 0 : 1
    }));
  };
  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={() => onCardHover(offer.id)}
      onMouseLeave={() => onCardHover(null)}
    >
      {
        offer.isPremium &&
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      }
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className='place-card__image'
            src={offer.previewImage} {...sizeImageRecord[sizeImage]}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className={cn(
              'place-card__bookmark-button',
              'button',
              {'place-card__bookmark-button--active': offer.isFavorite})}
            type='button'
            onClick={handleFavoriteClick}
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: `${getStars(offer.rating)}%`}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{offer.type}</p>
      </div>
    </article>
  );
}

export const MemoizedOffer = memo(Offer);
