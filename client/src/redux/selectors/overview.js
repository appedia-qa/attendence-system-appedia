// import { createSelector } from 'reselect';
// import { OVERVIEW_FILTER_SHOW_RANDOM, OVERVIEW_FILTER_SHOW_ALL } from '../actionTypes';

// export const selectOverviewData = state => state.overview.data;
// export const selectOverviewReducers = state => state.overview;

// const getOverviewDataFilter = (state, visibilityFilter) => visibilityFilter;
// const getOverviewData = (state) => state.overview.data;

// export const getFilteredOverviewData = createSelector(
//   [getOverviewDataFilter, getOverviewData],
//   (visibilityFilter, data) => {
//     if (data.length === 0) return [];

//     switch (visibilityFilter) {
//       case OVERVIEW_FILTER_SHOW_ALL:
//         return data
//       case OVERVIEW_FILTER_SHOW_RANDOM:
//         return [
//           data[Math.floor(Math.random() * data.length)],
//           data[Math.floor(Math.random() * data.length)],
//           data[Math.floor(Math.random() * data.length)]
//         ];
//     }
//   }
// );