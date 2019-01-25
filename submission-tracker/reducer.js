export const GET_SUBMISSIONS = 'GET_SUBMISSIONS';
export const GET_SUBMISSIONS_SUCCESS = 'GET_SUBMISSIONS_SUCCESS';
export const GET_SUBMISSIONS_FAIL = 'GET_SUBMISSIONS_FAIL';

export default function reducer(state = { submissions: [], totals: [] }, action) {
  switch (action.type) {
    case GET_SUBMISSIONS:
      return { ...state, loading: true };
    case GET_SUBMISSIONS_SUCCESS:
      return { ...state, loading: false, submissions: action.payload.data };
    case GET_SUBMISSIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching repositories'
      };
    default:
      return state;
  }
}

export function getSubmissions() {
  return {
    type: GET_SUBMISSIONS,
    payload: {
      request: {
        url: `/submissions`
      }
    }
  };
}