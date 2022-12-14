import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _messages = {
    onError: 'No recipes found for your query! Please try another one :)',
    onStart: 'Start by searching for a recipe or an ingredient. Have fun!',
  };

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const { goto } = btn.dataset;
      handler(parseInt(goto));
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButton.prev(currPage);
    }

    // Last Page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupButton.next(currPage);
    }

    // Other page (in-between)
    if (currPage < numPages) {
      return `
        ${this._generateMarkupButton.prev(currPage)}
        ${this._generateMarkupButton.next(currPage)}
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton = {
    prev(currPage) {
      return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    },
    next(currPage) {
      return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
      `;
    },
  };
}

export default new PaginationView();
