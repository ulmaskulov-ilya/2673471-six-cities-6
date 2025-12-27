import {memo, useState} from 'react';
import cn from 'classnames';
import {SortOption, SortOptionType} from '../../types/sort-option.type.ts';

type SortingOptionsProps = {
  currentOption: SortOptionType;
  onChangeSortOption: (option: SortOptionType) => void;
}
function SortingOptions({currentOption, onChangeSortOption}: SortingOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOptionClick = (option: SortOptionType) => {
    onChangeSortOption(option);
    setIsOpen(false);
  };
  const handleOptionsTogglerClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by </span>
      <span
        className='places__sorting-type'
        tabIndex={0}
        onClick={handleOptionsTogglerClick}
      >
        {currentOption}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      {isOpen && (
        <ul className='places__options places__options--custom places__options--opened'>
          {Object.values(SortOption).map((option) => (
            <li
              key={option}
              className={cn('places__option', {'places__option--active': option === currentOption})}
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default memo(SortingOptions);
