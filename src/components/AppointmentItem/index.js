// Write your code here
import './index.css'
import {format} from "date-fns"

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isStared} = appointmentDetails

  const staredImage = isStared ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
      alt="star"
    />
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
      alt="star"
    />
  )

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li className="appointment">
      <div className="star-container">
        <p className="appointment-title">{title}</p>
        <button onClick={onClickStar} data-testid="star">
          {staredImage}
        </button>
      </div>

      <p className="appointment-date">
        Date {format(new Date(date), 'd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}
export default AppointmentItem
