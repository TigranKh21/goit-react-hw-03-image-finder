import React from 'react';
import css from './SearchBar.module.css';

export const SearchBar = onSubmit => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <svg className={css.icon}>
            <use href="../symbols.svg#icon-search"></use>
          </svg>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
