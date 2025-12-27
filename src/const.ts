import {CityEnum} from './types/city.enum.ts';
import {OfferType} from './types/offer.type.ts';
import {SortOption, SortOptionType} from './types/sort-option.type.ts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favourites = '/favorites',
  Offer = '/offer',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ApiRoute {
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  Offers = '/offers',
  Reviews = '/comments',
  NotFound = '*'
}

export enum NameSpace {
  User = 'USER',
  Offers = 'OFFERS',
  Favorites = 'FAVORITES',
  Reviews = 'REVIEWS',
}
export function getStars(rating: number): number {
  return Math.round(rating) * 100 / 5;
}

export function getOffersByCity(offers: OfferType[], city: CityEnum): OfferType[] {
  return offers.filter((offer) => offer.city.name === city);
}

export function sortOffersByOption(offers: OfferType[], sortOption: SortOptionType): OfferType[] {
  const sortedOffers = [...offers];
  switch (sortOption) {
    case SortOption.PriceHighToLow:
      return sortedOffers.sort((a, b) => b.price - a.price);
    case SortOption.PriceLowToHigh:
      return sortedOffers.sort((a, b) => a.price - b.price);
    case SortOption.TopRatedFirst:
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    case SortOption.Popular:
    default:
      return offers;
  }
}

export const URL_MARKER_DEFAULT = 'public/img/pin.svg';

export const URL_MARKER_CURRENT = 'public/img/pin-active.svg';
