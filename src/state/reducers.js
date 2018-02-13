import {
  UPDPLAYERSTATUS
} from './actions'

// class Dossier {
//     constructor(
//         curId,
//         title,
//         items,
//         item
//     ) {
//         this.curId = curId;
//         this.title = title;
//         this.items = items;
//         this.item = item;
//     }
// }

const initialState = {
  player1Success: false,
  player1PublicRepos: 0,
  player1Followers: 0,
  player1AvatarURL: '',
  player2Success: false,
  player2PublicRepos: 0,
  player2Followers: 0,
  player2AvatarURL: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDPLAYERSTATUS:
      if (action.payload.id == 1) {
        return {
          ...state,
          player1Success: action.payload.playerSuccess,
          player1PublicRepos: action.payload.publicRepos,
          player1Followers: action.payload.followers,
          player1AvatarURL: action.payload.avatarUrl
        }
      } else {
        return {
          ...state,
          player2Success: action.payload.playerSuccess,
          player2PublicRepos: action.payload.publicRepos,
          player2Followers: action.payload.followers,
          player2AvatarURL: action.payload.avatarUrl
        }
      }
      default:
      return state
    }
}

// case ADDNEWITEM:
//     let updArr = []
//     state.dossier.forEach((dossier, idx) => {
//         if (idx == action.payload.selId) {
//             let newItems = []
//             dossier.items.forEach((item) => {
//                 newItems.push(item)
//             })
//             newItems.push({item: action.payload.item})
//             const updDoss = new Dossier(dossier.curId, dossier.title, newItems)
//             updArr.push(updDoss)
//         } else {
//             updArr.push(dossier)
//         }
//     })
//     return { ...state, dossier: updArr }
// case CLRACTIVE:
//     updArr = []
//     state.dossier.forEach((dossier, idx) => {
//         const updDoss = dossier
//         updDoss.curId = false
//         updArr.push(updDoss)
//     })
//     return { ...state, dossier: updArr }
// case SELDOSSIER:
//     let selArr = []
//     state.dossier.forEach((dossier, idx) => {
//         if (idx == action.payload.selId) {
//             const selDoss = dossier
//             selDoss.curId = true
//             selArr.push(selDoss)
//         } else {
//             selArr.push(dossier)
//         }
//     })
//     return { ...state, dossier: selArr }

export default reducer;