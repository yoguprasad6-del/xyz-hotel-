import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BedDouble,
  BellRing,
  CalendarDays,
  CarFront,
  Check,
  CheckCircle2,
  ChevronDown,
  Coffee,
  IndianRupee,
  Landmark,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Snowflake,
  Star,
  Users,
  UtensilsCrossed,
  Wifi,
} from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Rooms & Suites', href: '#rooms-suites' },
  { label: 'Temple Distance', href: '#temple-distance' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Contact', href: '#contact' },
]

const roomData = [
  {
    id: 1,
    title: 'Deluxe AC Room',
    price: 2499,
    distance: '500m to temple',
    guests: 2,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
    ],
    amenities: ['AC', 'Wi‑Fi', 'Breakfast', 'Hot Water'],
    description:
      'Simple, comfortable and well-kept for pilgrims who want a calm room close to the temple with all essentials covered.',
    rules: ['Check-in from 12:00 PM', 'Early check-in on request', 'Quiet hours after 10:30 PM', 'Family-friendly rooms'],
  },
  {
    id: 2,
    title: 'Temple View Suite',
    price: 3899,
    distance: '350m to temple',
    guests: 3,
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
    ],
    amenities: ['AC', 'Wi‑Fi', 'Breakfast', 'Temple View'],
    description:
      'A roomier suite with a quiet seating corner and a small view of the river and temple area for a relaxed spiritual stay.',
    rules: ['Maximum 3 adults', 'Extra bedding available on request', 'No outside food in rooms', 'Complimentary morning tea'],
  },
  {
    id: 3,
    title: 'Family Pure-Veg Stay',
    price: 4299,
    distance: '700m to temple',
    guests: 4,
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
    ],
    amenities: ['AC', 'Wi‑Fi', 'Breakfast', 'Parking'],
    description:
      'Built for families and group pilgrims, with more space, practical comforts and easy access to pure vegetarian meals.',
    rules: ['Family-friendly accommodation', 'Pure veg dining only', 'Parking subject to availability', 'Check-out at 11:00 AM'],
  },
]

const featureBadges = [
  { icon: Landmark, title: '5-Min Walk to Temple' },
  { icon: UtensilsCrossed, title: '100% Pure Veg & Jain Options' },
  { icon: BellRing, title: '24/7 Hot Water & Backup' },
  { icon: CarFront, title: 'Free On-Site Parking' },
]

const distanceList = [
  { label: 'Omkareshwar Jyotirlinga Temple', distance: '500m' },
  { label: 'Narmada Ghat / Boat Point', distance: '300m' },
  { label: 'Bus Stand', distance: '1.2 km' },
]

const faqs = [
  { question: 'What are your check-in and check-out times?', answer: 'Check-in starts at 12:00 PM and check-out is by 11:00 AM. Early check-in is available if rooms are ready.' },
  { question: 'When is the temple aarti timing?', answer: 'Morning and evening aarti timings vary with the temple schedule. Our front desk can guide you with the exact times on arrival.' },
  { question: 'Do you provide luggage storage?', answer: 'Yes. Guests can leave luggage with the reception desk before check-in or after check-out, subject to availability.' },
]

const defaultCheckIn = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
const defaultCheckOut = new Date(Date.now() + 172800000).toISOString().slice(0, 10)

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(roomData[0])
  const [selectedDetailsRoom, setSelectedDetailsRoom] = useState(roomData[0])
  const [bookingStep, setBookingStep] = useState(1)
  const [openFaq, setOpenFaq] = useState(0)
  const [paymentStatus, setPaymentStatus] = useState('')
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: 'Early check-in for morning Aarti',
    checkIn: defaultCheckIn,
    checkOut: defaultCheckOut,
    guests: 2,
    roomCategory: 'Deluxe AC Room',
  })

  const nights = useMemo(() => {
    const start = new Date(bookingForm.checkIn)
    const end = new Date(bookingForm.checkOut)
    const diff = end.getTime() - start.getTime()
    if (Number.isNaN(diff) || diff <= 0) return 1
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }, [bookingForm.checkIn, bookingForm.checkOut])

  const selectedRoomRate = useMemo(() => {
    const roomMatch = roomData.find((room) => room.title === bookingForm.roomCategory) || roomData[0]
    return roomMatch.price
  }, [bookingForm.roomCategory])

  const totalPayable = useMemo(() => {
    const roomCharge = selectedRoomRate * nights
    const gst = roomCharge * 0.12
    return Math.round(roomCharge + gst)
  }, [nights, selectedRoomRate])

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setBookingForm((prev) => ({ ...prev, [name]: value }))
  }

  const openBookingModal = (room = null) => {
    const chosenRoom = room || roomData.find((item) => item.title === bookingForm.roomCategory) || roomData[0]
    setSelectedRoom(chosenRoom)
    setBookingForm((prev) => ({ ...prev, roomCategory: chosenRoom.title }))
    setBookingOpen(true)
    setBookingStep(1)
    setPaymentStatus('')
  }

  const handleAvailability = () => {
    const chosenRoom = roomData.find((room) => room.title === bookingForm.roomCategory) || roomData[0]
    setSelectedRoom(chosenRoom)
    setBookingOpen(true)
    setBookingStep(1)
    setPaymentStatus('')
  }

  const handleRoomDetails = (room) => {
    setSelectedDetailsRoom(room)
    setDetailsOpen(true)
  }

  const handleRazorpayDemo = () => {
    setPaymentStatus('Creating secure order...')
    setTimeout(() => {
      setPaymentStatus('Payment successful via Razorpay demo')
      setBookingStep(3)
    }, 1200)
  }

  const sendWhatsApp = (type = 'booking') => {
    if (type === 'booking') {
      const message = `Hello Shree Narmada Stays & Suites,%0A%0AI would like to book a stay.%0AName: ${bookingForm.name || 'Guest'}%0APhone: ${bookingForm.phone || '+91 9876543210'}%0AEmail: ${bookingForm.email || 'guest@example.com'}%0ARoom: ${bookingForm.roomCategory}%0ADates: ${bookingForm.checkIn} to ${bookingForm.checkOut}%0AGuests: ${bookingForm.guests}%0ASpecial Request: ${bookingForm.specialRequests || 'None'}%0AEstimated Total: ₹${totalPayable}%0A%0APlease confirm my booking.`
      window.open(`https://wa.me/919876543210?text=${message}`, '_blank')
      return
    }

    window.open('https://wa.me/919876543210?text=Hello%20reception,%20I%20need%20help%20with%20my%20stay.', '_blank')
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2937]">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#FAF8F5]/95">
        <div className="section-shell flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B45309] text-base font-bold text-white">
              S
            </div>
            <div>
              <p className="font-display text-lg leading-none text-[#1F2937]">Shree Narmada</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">Stays & Suites</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-stone-600 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-[#B45309]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="hidden rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-300 sm:inline-flex"
            >
              Quick Call
            </a>
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 rounded-full bg-[#B45309] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8B3F00]"
            >
              Book Room
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="section-shell py-10 md:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B45309]">
                <Star size={12} className="fill-[#B45309] text-[#B45309]" />
                Sacred stay experience
              </div>

              <div className="space-y-5">
                <h1 className="font-display text-4xl leading-tight text-[#1F2937] sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
                  Experience Sacred Comfort Near Omkareshwar Temple
                </h1>
                <p className="max-w-xl text-lg leading-8 text-stone-600">
                  Thoughtful rooms, pure vegetarian food, and a quiet location just a short walk from the temple and ghat area.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
                <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2">
                  <MapPin size={15} className="text-[#B45309]" />
                  500m from Omkareshwar Temple
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2">
                  <ShieldCheck size={15} className="text-[#B45309]" />
                  Trusted by family pilgrims
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white p-3 shadow-sm">
              <div className="relative overflow-hidden rounded-[1.35rem]">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                  alt="Hotel room interior"
                  className="h-[420px] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1F2937]/70 to-transparent p-5">
                  <div className="flex items-center justify-between gap-4 text-white">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-amber-200">Premium stay</p>
                      <p className="mt-2 font-display text-2xl">Temple View Suite</p>
                    </div>
                    <div className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-sm font-semibold text-amber-100">
                      ₹3,899 / night
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm md:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              <label className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-3">
                <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  <CalendarDays size={14} className="text-[#B45309]" />
                  Check-in
                </span>
                <input
                  type="date"
                  name="checkIn"
                  value={bookingForm.checkIn}
                  onChange={handleFieldChange}
                  className="w-full bg-transparent text-sm font-medium text-[#1F2937] outline-none"
                />
              </label>

              <label className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-3">
                <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  <CalendarDays size={14} className="text-[#B45309]" />
                  Check-out
                </span>
                <input
                  type="date"
                  name="checkOut"
                  value={bookingForm.checkOut}
                  onChange={handleFieldChange}
                  className="w-full bg-transparent text-sm font-medium text-[#1F2937] outline-none"
                />
              </label>

              <label className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-3">
                <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  <Users size={14} className="text-[#B45309]" />
                  Guests
                </span>
                <select
                  name="guests"
                  value={bookingForm.guests}
                  onChange={handleFieldChange}
                  className="w-full bg-transparent text-sm font-medium text-[#1F2937] outline-none"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </label>

              <label className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-3">
                <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  <BedDouble size={14} className="text-[#B45309]" />
                  Room
                </span>
                <select
                  name="roomCategory"
                  value={bookingForm.roomCategory}
                  onChange={handleFieldChange}
                  className="w-full bg-transparent text-sm font-medium text-[#1F2937] outline-none"
                >
                  {roomData.map((room) => (
                    <option key={room.id} value={room.title}>
                      {room.title}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={handleAvailability}
                className="inline-flex items-center justify-center rounded-2xl bg-[#B45309] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#8B3F00]"
              >
                Check Availability
              </button>
            </div>
          </div>
        </section>

        <section className="section-shell py-6 md:py-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureBadges.map(({ icon: Icon, title }) => (
              <div key={title} className="rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-[#B45309]">
                  <Icon size={20} />
                </div>
                <p className="text-base font-semibold leading-6 text-[#1F2937]">{title}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="rooms-suites" className="scroll-mt-28 bg-[#F5F1EB] py-16 md:py-20">
          <div className="section-shell">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45309]">Rooms & Suites</p>
                <h2 className="mt-2 font-display text-3xl text-[#1F2937] md:text-5xl">Comfortable rooms for pilgrim stays</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-sm text-stone-600">
                <Star size={14} className="text-[#B45309]" />
                Practical comfort, warm service
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {roomData.map((room) => (
                <article key={room.id} className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm">
                  <div className="relative">
                    <img src={room.image} alt={room.title} className="h-72 w-full object-cover" />
                    <div className="absolute left-4 top-4 rounded-full border border-stone-200 bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-700">
                      {room.distance}
                    </div>
                  </div>

                  <div className="space-y-5 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl text-[#1F2937]">{room.title}</h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
                          <Users size={14} className="text-[#B45309]" />
                          Up to {room.guests} Guests
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-sm font-semibold text-[#B45309]">
                          <IndianRupee size={14} />
                          {room.price.toLocaleString('en-IN')}
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-stone-400">per night</p>
                      </div>
                    </div>

                    <p className="text-sm leading-6 text-stone-600">{room.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((item) => (
                        <span key={item} className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-[#B45309]">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleRoomDetails(room)}
                        className="flex-1 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 hover:border-stone-300"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={() => openBookingModal(room)}
                        className="flex-1 rounded-full bg-[#B45309] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#8B3F00]"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-16 md:py-20">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45309]">How to book</p>
            <h2 className="mt-2 font-display text-3xl text-[#1F2937] md:text-5xl">Simple booking in three steps</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: CalendarDays, title: 'Select Room & Dates', text: 'Choose your preferred room, stay dates and guest count in a few taps.' },
              { icon: IndianRupee, title: 'Pay Token via UPI / Card', text: 'Complete a quick secure payment and receive your confirmation token instantly.' },
              { icon: MessageSquareText, title: 'Get WhatsApp Confirmation', text: 'A booking voucher and live confirmation are sent directly to your phone.' },
            ].map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B45309] text-white">
                  <Icon size={22} />
                </div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-sm font-bold text-[#B45309]">
                    {index + 1}
                  </span>
                  <h3 className="font-display text-2xl text-[#1F2937]">{title}</h3>
                </div>
                <p className="text-sm leading-6 text-stone-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="temple-distance" className="scroll-mt-28 bg-white py-16 md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white p-3 shadow-sm">
              <iframe
                title="Omkareshwar Temple map"
                src="https://www.google.com/maps?q=Omkareshwar%20Temple&output=embed"
                className="h-[420px] w-full rounded-[1.15rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-[1.5rem] border border-stone-200 bg-[#FAF8F5] p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45309]">Distance guide</p>
              <h3 className="mt-3 font-display text-3xl text-[#1F2937]">Easy access to the holy spots</h3>

              <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white">
                <table className="min-w-full text-left">
                  <tbody>
                    {distanceList.map((item) => (
                      <tr key={item.label} className="border-t border-stone-200 first:border-t-0">
                        <td className="px-4 py-3 text-sm font-medium text-stone-700">{item.label}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#B45309]">{item.distance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 text-sm leading-6 text-stone-600">
                <div className="mb-2 flex items-center gap-2 font-semibold text-[#1F2937]">
                  <MapPin size={16} className="text-[#B45309]" />
                  Nearby attractions
                </div>
                Walk to the temple, ghats and riverfront in minutes, ideal for early aarti and evening walks.
              </div>
            </div>
          </div>
        </section>

        <section id="amenities" className="scroll-mt-28 section-shell py-16 md:py-20">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45309]">Amenities</p>
            <h2 className="mt-2 font-display text-3xl text-[#1F2937] md:text-5xl">Designed for practical comfort</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Pure Veg Meals', icon: UtensilsCrossed },
              { label: 'Hot Water 24/7', icon: BellRing },
              { label: 'Generator Backup', icon: ShieldCheck },
              { label: 'Private Parking', icon: CarFront },
              { label: 'Free Wi‑Fi', icon: Wifi },
              { label: 'AC Rooms', icon: Snowflake },
              { label: 'Breakfast Included', icon: Coffee },
              { label: 'Family Friendly', icon: CheckCircle2 },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-[1.35rem] border border-stone-200 bg-white p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#B45309]">
                  <Icon size={20} />
                </div>
                <span className="font-medium text-stone-700">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 bg-[#1F2937] py-16 text-white md:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">Reception desk</p>
              <h2 className="font-display text-3xl text-white md:text-5xl">Need help before or during your stay?</h2>
              <p className="max-w-lg text-stone-300">
                Call our reception desk for room assistance, local advice, temple timings and last-minute arrangements.
              </p>

              <div className="space-y-3">
                <a href="tel:+919876543210" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10">
                  <span className="inline-flex items-center gap-3 text-white">
                    <Phone size={18} className="text-amber-300" />
                    Call Receptionist
                  </span>
                  <span className="font-medium text-amber-200">+91 9876543210</span>
                </a>

                <button
                  type="button"
                  onClick={() => sendWhatsApp('support')}
                  className="flex w-full items-center justify-between rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-left transition hover:bg-emerald-500/15"
                >
                  <span className="inline-flex items-center gap-3 text-emerald-200">
                    <MessageCircle size={18} />
                    WhatsApp Reception Desk
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">Typical response: 2 mins</span>
                </button>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <div className="space-y-3">
                {faqs.map((item, index) => {
                  const isOpen = openFaq === index
                  return (
                    <div key={item.question} className="rounded-2xl border border-white/10 bg-[#2B3341] p-4">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 text-left"
                      >
                        <span className="font-medium text-white">{item.question}</span>
                        <ChevronDown size={18} className={`text-amber-300 transition ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && <p className="mt-3 text-sm leading-6 text-stone-300">{item.answer}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-[#FAF8F5] py-8">
        <div className="section-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl text-[#1F2937]">Shree Narmada Stays & Suites</p>
            <p className="mt-2 text-sm text-stone-600">Near Omkareshwar Temple, Madhya Pradesh.</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-stone-600">
              <a href="tel:+919876543210" className="hover:text-[#B45309]">+91 9876543210</a>
              <a href="mailto:manager@shreenarmadastays.com" className="hover:text-[#B45309]">manager@shreenarmadastays.com</a>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-stone-600">
            <span>© 2026 All rights reserved.</span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
              Powered by Elev8 Digital Studio
            </span>
          </div>
        </div>
      </footer>

      {detailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/60 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[1.5rem] bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B45309]">Room details</p>
                <h3 className="mt-2 font-display text-3xl text-[#1F2937]">{selectedDetailsRoom.title}</h3>
              </div>
              <button type="button" onClick={() => setDetailsOpen(false)} className="rounded-full border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-700">
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {selectedDetailsRoom.gallery.map((image, index) => (
                <img key={index} src={image} alt={`${selectedDetailsRoom.title} view ${index + 1}`} className="h-48 w-full rounded-[1.2rem] object-cover" />
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-base leading-7 text-stone-600">{selectedDetailsRoom.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedDetailsRoom.amenities.map((item) => (
                    <span key={item} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B45309]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-stone-200 bg-[#FAF8F5] p-5">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">House rules</p>
                <ul className="space-y-3 text-sm text-stone-600">
                  {selectedDetailsRoom.rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-[#B45309]" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/70 p-4">
          <div className="w-full max-w-4xl rounded-[1.5rem] bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B45309]">Booking & payment</p>
                <h3 className="mt-2 font-display text-3xl text-[#1F2937]">{selectedRoom.title}</h3>
              </div>
              <button type="button" onClick={() => setBookingOpen(false)} className="rounded-full border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-700">
                Close
              </button>
            </div>

            <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${bookingStep >= step ? 'bg-[#B45309] text-white' : 'bg-stone-100 text-stone-500'}`}>
                    {step}
                  </div>
                  {step < 3 && <div className={`h-px w-8 ${bookingStep > step ? 'bg-[#B45309]' : 'bg-stone-200'}`} />}
                </div>
              ))}
            </div>

            {bookingStep === 1 && (
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-stone-700">Name</span>
                  <input type="text" name="name" value={bookingForm.name} onChange={handleFieldChange} placeholder="Guest name" className="w-full rounded-2xl border border-stone-200 bg-[#FAF8F5] px-4 py-3 outline-none focus:border-[#B45309]" />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-stone-700">Phone Number</span>
                  <input type="tel" name="phone" value={bookingForm.phone} onChange={handleFieldChange} placeholder="+91 98765 43210" className="w-full rounded-2xl border border-stone-200 bg-[#FAF8F5] px-4 py-3 outline-none focus:border-[#B45309]" />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-stone-700">Email</span>
                  <input type="email" name="email" value={bookingForm.email} onChange={handleFieldChange} placeholder="guest@example.com" className="w-full rounded-2xl border border-stone-200 bg-[#FAF8F5] px-4 py-3 outline-none focus:border-[#B45309]" />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-stone-700">Guests</span>
                  <select name="guests" value={bookingForm.guests} onChange={handleFieldChange} className="w-full rounded-2xl border border-stone-200 bg-[#FAF8F5] px-4 py-3 outline-none focus:border-[#B45309]">
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-medium text-stone-700">Special Requests</span>
                  <textarea name="specialRequests" value={bookingForm.specialRequests} onChange={handleFieldChange} rows="3" className="w-full rounded-2xl border border-stone-200 bg-[#FAF8F5] px-4 py-3 outline-none focus:border-[#B45309]" />
                </label>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="rounded-[1.4rem] border border-stone-200 bg-[#FAF8F5] p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-stone-500">Stay summary</p>
                    <h4 className="font-display text-2xl text-[#1F2937]">{bookingForm.roomCategory}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-stone-500">Rate / night</p>
                    <p className="text-xl font-bold text-[#1F2937]">₹{selectedRoomRate.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-stone-600">
                  <div className="flex items-center justify-between">
                    <span>Check-in</span>
                    <strong>{bookingForm.checkIn}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Check-out</span>
                    <strong>{bookingForm.checkOut}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Stay nights</span>
                    <strong>{nights}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Room charge</span>
                    <strong>₹{(selectedRoomRate * nights).toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>GST (12%)</span>
                    <strong>₹{Math.round(selectedRoomRate * nights * 0.12).toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-base font-bold text-[#1F2937]">
                    <span>Total Payable</span>
                    <span>₹{totalPayable.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="rounded-[1.4rem] border border-emerald-200 bg-emerald-50 p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <CheckCircle2 size={30} />
                </div>
                <h4 className="mt-4 font-display text-3xl text-[#1F2937]">Booking Confirmed</h4>
                <p className="mt-2 text-sm text-stone-600">{paymentStatus || 'Your reservation has been confirmed and a voucher will be shared on WhatsApp.'}</p>
                <div className="mt-5 inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
                  Confirmation ID: NMS-{Math.floor(Math.random() * 9000 + 1000)}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              {bookingStep > 1 && (
                <button type="button" onClick={() => setBookingStep((prev) => prev - 1)} className="rounded-full border border-stone-200 px-5 py-2.5 text-sm font-semibold text-stone-700">
                  Back
                </button>
              )}

              {bookingStep < 2 && (
                <button type="button" onClick={() => setBookingStep(2)} className="rounded-full bg-[#B45309] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8B3F00]">
                  Continue to Summary
                </button>
              )}

              {bookingStep === 2 && (
                <>
                  <button type="button" onClick={handleRazorpayDemo} className="rounded-full bg-[#1F2937] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F172A]">
                    Pay ₹{totalPayable.toLocaleString('en-IN')} via Razorpay / UPI
                  </button>
                  <button type="button" onClick={sendWhatsApp} className="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700">
                    Book & Confirm via WhatsApp
                  </button>
                </>
              )}

              {bookingStep === 3 && (
                <button type="button" onClick={() => setBookingOpen(false)} className="rounded-full bg-[#B45309] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8B3F00]">
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-40 hidden sm:block">
        <a href="tel:+919876543210" className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#B45309] text-white shadow-sm transition hover:bg-[#8B3F00]">
          <Phone size={20} />
        </a>
      </div>
    </div>
  )
}

export default App
