import { CalendarHeart, Gift, HeartHandshake, Plane, UtensilsCrossed, Home, PartyPopper } from "lucide-react"

const timelineEvents = [
  {
    date: "One day, 2019",
    title: "First Meeting",
    description: "The day our eyes met for the first time",
    icon: HeartHandshake,
  },
  {
    date: "October 25, 2019",
    title: "First Date",
    description: "We GO to DP mall and make my first photobx",
    icon: UtensilsCrossed,
  },
  {
    date: "April 8, 2022",
    title: "Finally Meet Again",
    description: "The day we decided to meet again",
    icon: CalendarHeart,
  },
  {
    date: "September 21, 2024",
    title: "Hangout",
    description: "We Go To Kota Lama and take a photobox",
    icon: Plane,
  },
  
  {
    date: "January 24, 2024",
    title: "Flower Day",
    description: "I gift  a someone flower firt of my life",
    icon: Home,
  },
  {
    date: "Today",
    title: "Still Going Strong",
    description: "Every day with you is a blessing",
    icon: PartyPopper,
  },
]

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-pink-200" />

      {/* Timeline events */}
      {timelineEvents.map((event, index) => (
        <div key={index} className={`relative mb-12 flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
          {/* Content */}
          <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
            <div className="rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105">
              <p className="text-sm font-medium text-pink-400">{event.date}</p>
              <h3 className="mb-1 text-lg font-bold text-pink-600">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          </div>

          {/* Icon */}
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white shadow-md">
              <event.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
