import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import './App.css'
import { connect } from 'react-redux';
import { postNote } from './state/actions';
import axios from 'axios';

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        noteVal: '',
        noteMsg: '',
        noteErr: false,
        noteSbmBtn: true,
        notesExist: false,
        notes: []
      }

    this.onNoteIn = this.onNoteIn.bind(this)
    this.onNoteClick = this.onNoteClick.bind(this)
    this.postNote = this.postNote.bind(this)
    this.getNotes = this.getNotes.bind(this)
  }

  componentDidMount() {
    this.getNotes()
  }

  onNoteIn({ target }) {
    if (target.value.length <= 3) {
      this.setState({ noteVal: target.value, noteErr: true, noteMsg: 'Please enter a note of at least three characters.', noteSbmBtn: true })
    } else {
      this.setState({ noteVal: target.value, noteErr: false, noteMsg: '', noteSbmBtn: false })
    }
  }

  onNoteClick(evt) {
    evt.preventDefault();
    this.postNote({ note: this.state.noteVal })
    // if (this.props.noteSuccess) {
    //   this.setState({ noteVal: '', noteSbmBtn: true })
    // } else {
    //   console.log(this.props.noteSuccess)
    //   this.setState({ noteVal: this.state.noteVal, noteErr: true, noteMsg: 'GitHub username does not exist, try again.', noteSbmBtn: true })
    // }
  }

  postNote(payload) {
    let apiVal = `http://5a8318ed98bd81001246c8e1.mockapi.io/anonnote/v1/notes`
    axios.post(apiVal, payload)
      .then((response) => {
        console.log(response.data)
        this.getNotes()
        // if (payload.id == 1) {
        //   this.setState({ noteVal: '', noteSbmBtn: true, noteSuccess: true, notePublicRepos: response.data.public_repos, noteFollowers: response.data.followers, noteAvatarURL: response.data.avatar_url })
        // } else {
        //   this.setState({ player2Val: '', player2SbmBtn: true, player2Success: true, player2PublicRepos: response.data.public_repos, player2Followers: response.data.followers, player2AvatarURL: response.data.avatar_url })
        // }
      })
      .catch((error) => {
        console.log(error)
        this.setState({ noteVal: this.state.noteVal, noteErr: true, noteMsg: 'Note failed to post, please try again.', noteSbmBtn: true })
        // if (payload.id == 1) {
        //   this.setState({ noteVal: this.state.noteVal, noteErr: true, noteMsg: 'GitHub username does not exist, try again.', noteSbmBtn: false, noteSuccess: false, notePublicRepos: 0, noteFollowers: 0, noteAvatarURL: '' })
        // } else {
        //   this.setState({ player2Val: this.state.player2Val, player2Err: true, player2Msg: 'GitHub username does not exist, try again.', player2SbmBtn: false, player2Success: false, player2PublicRepos: 0, player2Followers: 0, player2AvatarURL: '' })
        // }
      })
  }

  getNotes() {
    let apiVal = `http://5a8318ed98bd81001246c8e1.mockapi.io/anonnote/v1/notes`
    axios.get(apiVal)
      .then((response) => {
        console.log(response.data)
        this.setState({ notes: response.data, notesExist: true, noteErr: false, noteMsg: '' })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ notesExist: false, noteErr: true, noteMsg: 'Failed to get notes.' })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <form>
          <div className="row">
            <div className="small-12 columns">
              <div className="card">
                <div className="row">
                  <div className="small-10 columns md-text-field with-floating-label icon-left">
                    <input type="search" id="note_in" value={this.state.noteVal} onChange={this.onNoteIn} />
                    <label for="note_in">Note:</label>
                    <span className="error">{this.state.noteMsg}</span>
                  </div>
                  <button type="search" className="button btn-cta" id="noteBtn" disabled={this.state.noteSbmBtn} onClick={this.onNoteClick}>Add Note</button>
                </div>
              </div>
            </div>
            {this.state.notesExist &&
              <div className="row">
                <div className="small-12 columns">
                  <div className="card">
                    <div className="noteCtn">
                      {this.state.notes.map((note, idx) => {
                        let extDate = new Date(note.createdAt * 1000)
                        let dspMonth = extDate.toLocaleString("en", { month: "short" })
                        let dspDay = extDate.getDate()
                        let dspYear = extDate.getFullYear()
                        let dspHour = extDate.getHours()
                        let dspMins = extDate.getMinutes()
                        let dspSecs = extDate.getSeconds()
                        return (
                          <div className="row">
                            <div className="small-9 columns">&nbsp;</div>
                            <div className="small-3 columns noteDsp">Noted on: {dspMonth} {dspDay}, {dspYear}, {dspHour}:{dspMins}:{dspSecs} </div>
                            <div className="row"></div>
                            <div className="small-12 columns noteDsp" key={idx}>{note.note} </div>
                          </div>
                      )
                      })
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    noteSuccess: state.noteSuccess,
    player2Success: state.player2Success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postNote: function (payload) {
      dispatch(postNote(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Battle);
