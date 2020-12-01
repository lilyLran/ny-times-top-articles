import { getItem, setItem } from './localStorage';

const defaultRecentSearches = [];

export const RECENT_SEARCHES_STORAGE_ID = 'search.recent';

export function updateSavedSearches(store) {
	const recentSearches = store.getState().search.recentSearches;
	setItem(RECENT_SEARCHES_STORAGE_ID, recentSearches);
}

export default function getRecentSearches() {
	return getItem(RECENT_SEARCHES_STORAGE_ID) || defaultRecentSearches;
}

