import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', filterStars: false}

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    this.setState(prevState => {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isStared: false,
      }

      return {
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }
    })
  }

  toggleStar = id => {
    this.setState(prevState => {
      const {appointmentsList} = prevState

      return {
        appointmentsList: appointmentsList.map(eachAppointment => {
          if (eachAppointment.id === id) {
            return {...eachAppointment, isStared: !eachAppointment.isStared}
          }

          return eachAppointment
        }),
      }
    })
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  filterStaredComments = () => {
    this.setState(prevState => ({filterStars: !prevState.filterStars}))
  }

  render() {
    const {appointmentsList, title, date, filterStars} = this.state
    const filterButton = filterStars && 'stared-button'
    const filteredComments = appointmentsList.filter(
      eachAppointment => eachAppointment.isStared === true,
    )

    const finalAppointments = filterStars ? filteredComments : appointmentsList

    return (
      <div className="app-bg-container">
        <div className="appointments-card">
          <div className="add-appointments-container">
            <form onSubmit={this.onAddAppointment}>
              <h1 className="main-heading">Add Appointment</h1>
              <label className="input-heading" htmlFor="title">
                TITLE
              </label>

              <br />
              <input
                type="text"
                className="input"
                id="title"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <label className="input-heading" htmlFor="date">
                DATE
              </label>
              <br />
              <input
                type="date"
                id="date"
                className="input date-input"
                placeholder="Date"
                value={date}
                onChange={this.onChangeDate}
              />
              <div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>

            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="appointments-image"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="horizontal-rule" />
          <div className="card-bottom">
            <div className="appointments-headings-container">
              <h1 className="sub-heading">Appointments</h1>
              <button
                className={`button ${filterButton}`}
                onClick={this.filterStaredComments}
              >
                Starred
              </button>
            </div>

            <ul>
              {finalAppointments.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  toggleStar={this.toggleStar}
                  key={eachAppointment.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
