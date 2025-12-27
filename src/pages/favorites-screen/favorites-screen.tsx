import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo.tsx';
import HeaderNav from '../../components/header-nav/header-nav.tsx';
import {AppRoute} from '../../const.ts';
import { useAppSelector } from '../../hooks/index.ts';
import {
  getFavoriteOffers,
  getFavoritesLoadingStatus,
  getGroupedFavoriteOffers
} from '../../store/favorites/selectors.ts';
import FavoritesEmptyScreen from './favorites-empty-screen.tsx';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.tsx';
import {MemoizedOffer} from '../../components/offer/offer.tsx';
import {useCallback} from 'react';

export default function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector(getFavoriteOffers);
  const groupedByCity = useAppSelector(getGroupedFavoriteOffers);
  const isFavoritesLoading = useAppSelector(getFavoritesLoadingStatus);
  const handleCardHover = useCallback(() => null, []);
  if (isFavoritesLoading) {
    return <LoadingSpinner />;
  }

  const listFavorites = Object.entries(groupedByCity).map(([city, groupedOffers]) => (
    <li className='favorites__locations-items' key={city}>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <Link to={AppRoute.Main} className='locations__item-link'>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className='favorites__places'>
        {groupedOffers.map((offer) => (
          <MemoizedOffer offer={offer} key={offer.id} block='favorites' sizeImage='small' onCardHover={handleCardHover}/>
        ))}
      </div>
    </li>
  ));
  if (favorites.length === 0) {
    return <FavoritesEmptyScreen/>;
  }
  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Logo/>
            </div>
            <nav className='header__nav'>
              <HeaderNav favoriteCount={favorites.length}/>
            </nav>
          </div>
        </div>
      </header>

      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              {listFavorites}
            </ul>
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <Link to={AppRoute.Main} className='footer__logo-link'>
          <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33'/>
        </Link>
      </footer>
    </div>
  );
}
