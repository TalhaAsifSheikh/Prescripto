import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors,currencySymbol} = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slottedTime, setSlottedTime] = useState('')


  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo)
  }

  useEffect(() => {
    fetchDocInfo()
  }, [docId])

  return docInfo &&  (
    <div className="flex flex-col sm:flex-row gap-4 p-4">
    {/* Doctor Image */}
    <div className="flex justify-center sm:justify-start">
      <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
    </div>
  
    {/* Doctor Info */}
    <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
      {/* Doctor Name and Verified Badge */}
      <div className="flex items-center gap-2 text-2xl font-medium text-gray-900">
        <p>{docInfo.name}</p>
        <img className="w-5" src={assets.verified_icon} alt="Verified" />
      </div>
  
      {/* Degree and Experience */}
      <div className="flex items-center gap-4 mt-2">
        <p className="text-sm text-gray-600">{docInfo.degree} - {docInfo.speciality}</p>
        <button className="py-1 px-3 border border-gray-300 text-xs rounded-full">
          {docInfo.experience}
        </button>
      </div>
  
      {/* About Section */}
      <div className="mt-6">
        <div className="flex items-center gap-1 text-lg font-medium text-gray-900">
          <p>About</p>
          <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
        </div>
        <p className="text-sm text-gray-500 mt-2">{docInfo.about}</p>
      </div>
  
      {/* Appointment Fee */}
      <div>
       <p className='text-gray-500 font-medium mt-4'>
         Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
       </p>
      </div>
    </div>
  </div>
  
  )
}

export default Appointment