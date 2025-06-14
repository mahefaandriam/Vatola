import React from 'react';
import SectionTitle from '../components/SectionTitle';
import BookingForm from '../components/BookingForm';
import {Mail, Phone} from 'lucide-react';

const BookingPage: React.FC = () => {
  return (
    <div className="pt-24 md:pt-28">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Book Your Stay"
            subtitle="Reserve your luxurious accommodation at VATOLAHY LUXY HOTEL and prepare for an unforgettable experience."
          />
          
          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              title="Booking Information"
              subtitle="Important details about our booking and cancellation policies."
            />
            
            <div className="bg-gray-50 rounded-lg shadow-luxury p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">Check-in / Check-out</h3>
                  <p className="text-gray-600">
                    Check-in time is from 3:00 PM, and check-out time is by 12:00 PM. Early check-in and late 
                    check-out may be available upon request, subject to availability and additional charges.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">Reservation Requirements</h3>
                  <p className="text-gray-600 mb-3">
                    To secure your reservation, we require:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Valid credit card for guarantee</li>
                    <li>Government-issued photo ID at check-in</li>
                    <li>Minimum age of 18 years for the registered guest</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">Cancellation Policy</h3>
                  <p className="text-gray-600">
                    Reservations may be cancelled up to 48 hours before the scheduled arrival date without penalty. 
                    Cancellations made within 48 hours of the arrival date will incur a charge equal to one night's stay. 
                    No-shows will be charged for the entire reserved stay.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">Special Requests</h3>
                  <p className="text-gray-600">
                    We are happy to accommodate special requests such as specific room locations, additional 
                    amenities, or accessibility requirements. Please note that these requests are subject to 
                    availability and cannot be guaranteed.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Need Assistance?</h3>
                <p className="text-gray-600 mb-4">
                  Our reservations team is available to assist you with any questions or special requirements.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+15551234567"
                    className="inline-flex items-center text-accent hover:text-gold-700 transition duration-300"
                  >
                    <Phone size={16} className="mr-2" />
                    +1 (555) 123-4567
                  </a>
                  <a
                    href="mailto:reservations@vatolahyluxy.com"
                    className="inline-flex items-center text-accent hover:text-gold-700 transition duration-300"
                  >
                    <Mail size={16} className="mr-2" />
                    reservations@vatolahyluxy.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;