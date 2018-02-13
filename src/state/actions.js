import axios from 'axios';
/*
 * action types
 */
export const UPDPLAYERSTATUS = 'UPDPLAYERSTATUS';

/*
 * action creators
 */

export function postNote(payload) {

  return (dispatch, getState, url) => {
    let apiVal = `${url}${payload.userName}`
    axios.get(apiVal)
      .then((response) => {
        console.log(response.data);
        dispatch(updPlayerStatus({ id: payload.id, playerSuccess: true, publicRepos: response.data.public_repos, followers: response.data.followers, avatarUrl: response.data.avatar_url}))
      })
      .catch((error) => {
        console.log(error);
        dispatch(updPlayerStatus({ id: payload.id, playerSuccess: false, publicRepos: 0, followers: 0, avatarUrl: '' }))
      })
  }
}

export function updPlayerStatus(payload) {
  console.log(payload)
  return { type: UPDPLAYERSTATUS, payload: payload }
}
