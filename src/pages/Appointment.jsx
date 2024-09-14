import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slottedTime, setSlottedTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(currentDate.getDate() + i)

      // Set start time to 10:30 AM and end time to 5:00 PM
      let startTime = new Date(currentDate)
      startTime.setHours(10, 30, 0, 0) // Start at 10:30 AM
      
      let endTime = new Date(currentDate)
      endTime.setHours(17, 0, 0, 0) // End at 5:00 PM

      let timeSlots = []

      // Generate time slots between 10:30 AM and 5:00 PM
      while (startTime < endTime) {
        let formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        timeSlots.push({
          datetime: new Date(startTime),
          time: formattedTime
        })

        startTime.setMinutes(startTime.getMinutes() + 30) // Increment by 30 minutes
      }

      setDocSlots(prev => [...prev, { date: currentDate.toDateString(), slots: timeSlots }])
    }
  }

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    fetchDocInfo()
  }, [docId])

  return docInfo && (
    <div className="container mx-auto p-4">
      {/* Doctor Info & Image */}
      <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-12 bg-white rounded-lg shadow-lg">
        {/* Doctor Image */}
        <div className="flex lg:justify-center">
          <img className="bg-primary w-48 lg:w-64 rounded-lg shadow-md" src={docInfo.image} alt="" />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 text-2xl font-semibold text-gray-800">
            <p>{docInfo.name}</p>
            <img className="w-6" src={assets.verified_icon} alt="Verified" />
          </div>

          <div className="flex items-center gap-4 mt-2">
            <p className="text-md text-gray-600">{docInfo.degree} - {docInfo.speciality}</p>
            <span className="py-1 px-3 border border-gray-300 text-xs rounded-full">
              {docInfo.experience}
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-1 text-lg font-medium text-gray-800">
              <p>About</p>
              <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
            </div>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">{docInfo.about}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee: <span className="text-gray-800">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-8">
        <p className="font-medium text-lg text-gray-800">Booking Slots</p>
        <div className="flex gap-4 items-center w-full overflow-x-auto mt-4">
          {docSlots.length && docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 px-6 rounded-lg cursor-pointer transition-colors duration-300 ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200 text-gray-600'}`}
              key={index}
            >
              <p>{daysOfWeek[new Date(item.date).getDay()]}</p>
              <p>{new Date(item.date).getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-center w-full overflow-x-auto mt-4">
          {docSlots.length && docSlots[slotIndex].slots.map((item, index) => (
            <p
              onClick={() => setSlottedTime(item.time)}
              className={`text-sm font-light px-6 py-3 rounded-lg cursor-pointer transition-colors duration-300 ${item.time === slottedTime ? 'bg-primary text-white' : 'text-gray-600 border border-gray-300'}`}
              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button className="mt-6 bg-primary text-white text-sm font-medium py-3 px-12 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Book An Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-12">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  )
}

export default Appointment
