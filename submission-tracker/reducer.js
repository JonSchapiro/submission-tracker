// GET ALL SUBMISSION TOTALS
export const GET_SUBMISSIONS = 'GET_SUBMISSIONS';
export const GET_SUBMISSIONS_SUCCESS = 'GET_SUBMISSIONS_SUCCESS';
export const GET_SUBMISSIONS_FAIL = 'GET_SUBMISSIONS_FAIL';

// ADD A NEW SUBMISSION
export const ADD_SUBMISSIONS = 'ADD_SUBMISSIONS';
export const ADD_SUBMISSIONS_SUCCESS = 'ADD_SUBMISSIONS_SUCCESS';
export const ADD_SUBMISSIONS_FAIL = 'ADD_SUBMISSIONS_FAIL';

export default function reducer(state = { submissions: [], totals: [], loading: false, error: null }, action) {
  switch (action.type) {
    // GET SUBMISSION TOTALS ACTIONS
    case GET_SUBMISSIONS:
      return { ...state, loading: true, error: null };
    case GET_SUBMISSIONS_SUCCESS:
      return { ...state, loading: false, error: null, submissions: action.payload.data };
    case GET_SUBMISSIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching totals'
      };
    // ADD SUBMISSION ACTIONS
    case ADD_SUBMISSIONS: 
      return { ...state, loading: true };
    case ADD_SUBMISSIONS_SUCCESS: 
      return {...state, loading: false};
    case ADD_SUBMISSIONS_FAIL: 
      return {...state, loading: false, error: 'Error while adding new submission'};
    default:
      return state;
  }
}

export function getSubmissions() {
  return {
    type: GET_SUBMISSIONS,
    payload: {
      request: {
        url: `/totals`
      }
    }
  };
}

export function addSubmission(submission) {
    return {
        type: ADD_SUBMISSIONS,
        payload: {
            request: {
                method: 'post',
                url: `/submissions`,
                data: submission
            }
        }
    }
}