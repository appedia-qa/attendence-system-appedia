import reducer from '../overview';

import * as types from '../../actionTypes/index';


const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: false,
}

describe('Home Screen Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: null })).toEqual(initialState)
  })

  it('should handle data on success ', () => {
    expect(
      reducer([], {
        type: types.FETCH_OVERVIEW_DATA_SUCCESS,
        payload: { data: [{a:1}] }
      })
    ).toEqual(
      {
        data: [{a:1}],
        loading: false,
        loaded: true,
        error: false
      }
    )

    expect(
      reducer([], {
        type: types.FETCH_OVERVIEW_DATA_SUCCESS,
        // no data passing, should handle edge case
      })
    ).toEqual(
      {
        data: [],
        loading: false,
        loaded: true,
        error: false
      }
    )

    expect(
      reducer(null, {
        type: types.FETCH_OVERVIEW_DATA_ERROR
      })
    ).toEqual(
      {
        loading: false,
        loaded: true,
        error: true
      }
    )
  })


  it('should handle data on failure', () => {
    expect(reducer(undefined, { type: null })).toEqual(initialState)
    expect(
      reducer(undefined, {
        type: types.FETCH_OVERVIEW_DATA_ERROR
      })
    ).toEqual(
      {
        data: [],
        loading: false,
        loaded: true,
        error: true
      }
    )
  })



  it('should handle flag on inprogress', () => {
    expect(reducer(undefined, { type: null })).toEqual(initialState)
    expect(
      reducer(undefined, {
        type: types.FETCH_OVERVIEW_DATA_INPROGRESS
      })
    ).toEqual(
      {
        data: [],
        loading: true,
        loaded: false,
        error: false
      }
    )
  })
})
