import React, {PropTypes, Component} from 'react';
import range from 'lodash/utility/range';

import {capitalize} from '../utils';
import themeable from '../themeable';
import translatable from '../translatable';

import LinkList from './LinkList';

function getPagesDisplayedCount(padding, total) {
  return Math.min(2 * padding + 1, total);
}

function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
  if (current <= padding) {
    return current;
  }

  if (current >= total - padding) {
    return totalDisplayedPages - (total - current);
  }

  return padding;
}

function getPages(page, total, padding) {
  const totalDisplayedPages = getPagesDisplayedCount(padding, total);
  if (totalDisplayedPages === total) return range(0, total);

  const paddingLeft = calculatePaddingLeft(
    page,
    padding,
    total,
    totalDisplayedPages
  );
  const paddingRight = totalDisplayedPages - paddingLeft;

  const first = page - paddingLeft;
  const last = page + paddingRight;

  return range(first, last);
}

class Pagination extends Component {
  static propTypes = {
    nbPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    refine: PropTypes.func.isRequired,
    createURL: PropTypes.func.isRequired,

    translate: PropTypes.func.isRequired,
    applyTheme: PropTypes.func.isRequired,
    listComponent: PropTypes.func,
    showFirst: PropTypes.bool,
    showPrevious: PropTypes.bool,
    showNext: PropTypes.bool,
    showLast: PropTypes.bool,
    pagesPadding: PropTypes.number,
    maxPages: PropTypes.number,
  };

  static defaultProps = {
    listComponent: LinkList,
    showFirst: true,
    showPrevious: true,
    showNext: true,
    showLast: false,
    pagesPadding: 3,
    maxPages: Infinity,
  };

  getItem(modifier, translationKey, value) {
    const {
      nbPages,
      maxPages,
      translate,
    } = this.props;
    return {
      key: `${modifier}.${value}`,
      modifier,
      disabled:
        value < 0 ||
        value >= Math.min(maxPages, nbPages),
      label: translate(translationKey, value),
      value,
      ariaLabel: translate(`aria${capitalize(translationKey)}`, value),
    };
  }

  render() {
    const {
      nbPages,
      maxPages,
      page,
      pagesPadding,
      showFirst,
      showPrevious,
      showNext,
      showLast,
      refine,
      createURL,
      applyTheme,
      translate,
      listComponent: ListComponent,
    } = this.props;

    const totalPages = Math.min(nbPages, maxPages);
    const lastPage = totalPages - 1;

    let items = [];
    if (showFirst) {
      items.push({
        key: 'first',
        modifier: 'itemFirst',
        disabled: page === 0,
        label: translate('first'),
        value: 0,
        ariaLabel: translate('ariaFirst'),
      });
    }
    if (showPrevious) {
      items.push({
        key: 'previous',
        modifier: 'itemPrevious',
        disabled: page === 0,
        label: translate('previous'),
        value: page - 1,
        ariaLabel: translate('ariaPrevious'),
      });
    }
    items = items.concat(
      getPages(page, totalPages, pagesPadding).map(value => ({
        key: value,
        modifier: 'itemPage',
        label: translate('page', value),
        value,
        ariaLabel: translate('ariaPage', value),
      }))
    );
    if (showNext) {
      items.push({
        key: 'next',
        modifier: 'itemNext',
        disabled: page === lastPage,
        label: translate('next'),
        value: page + 1,
        ariaLabel: translate('ariaNext'),
      });
    }
    if (showLast) {
      items.push({
        key: 'last',
        modifier: 'itemLast',
        disabled: page === lastPage,
        label: translate('last'),
        value: lastPage,
        ariaLabel: translate('ariaLast'),
      });
    }

    return (
      <ListComponent
        applyTheme={applyTheme}
        items={items}
        selectedItem={page}
        onSelect={refine}
        createURL={createURL}
      />
    );
  }
}

export default themeable({
  root: 'Pagination',
  item: 'Pagination__item',
  itemFirst: 'Pagination__item--first',
  itemLast: 'Pagination__item--last',
  itemPrevious: 'Pagination__item--previous',
  itemNext: 'Pagination__item--next',
  itemPage: 'Pagination__item--page',
  itemSelected: 'Pagination__item--selected',
  itemDisabled: 'Pagination__item--disabled',
  itemLink: 'Pagination__item__link',
})(
  translatable({
    previous: '‹',
    next: '›',
    first: '«',
    last: '»',
    page: page => (page + 1).toString(),
    ariaPrevious: 'Previous page',
    ariaNext: 'Next page',
    ariaFirst: 'First page',
    ariaLast: 'Last page',
    ariaPage: page => `Page ${(page + 1).toString()}`,
  })(
    Pagination
  )
);
