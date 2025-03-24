import { useState } from 'react';
import { Clock, Users, MessageSquare } from 'lucide-react';
import Footer from './Footer';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const timeSlots: TimeSlot[] = [
  { id: '1', time: '9:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '2:00 PM', available: true },
  { id: '5', time: '3:00 PM', available: true },
  { id: '6', time: '4:00 PM', available: true },
];

export function ExpertConsultation() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBookSession = () => {
    if (selectedDate && selectedTime) {
      setShowConfirmation(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <h1 className="text-2xl font-semibold mb-2">Book a Session with Product Expert</h1>
        <p className="text-gray-600 mb-6">
          Schedule a free 30-minute exploratory session with our experienced product managers. 
          We'll discuss your project, brainstorm ideas, and chart a path forward for your product development journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="font-medium mb-1">30-Minute Session</h3>
                <p className="text-sm text-gray-600">
                  Quick but focused discussion about your product vision
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Expert Product Managers</h3>
                <p className="text-sm text-gray-600">
                  Connect with PMs who've built successful products
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Personalized Guidance</h3>
                <p className="text-sm text-gray-600">
                  Get actionable insights tailored to your product
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                      ${slot.available 
                        ? selectedTime === slot.time
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border hover:bg-gray-50'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleBookSession}
              disabled={!selectedDate || !selectedTime}
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Book Free Session
            </button>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-green-800 mb-2">Session Booked Successfully!</h3>
          <p className="text-green-600">
            Your session is scheduled for {selectedDate} at {selectedTime}. 
            We'll send you an email with the meeting link and further details.
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}