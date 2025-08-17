

export interface ITour {
    _id: string
    title: string
    description: string
    images: string[]
    location: string
    startDate: string
    endDate: string
    included: string[]
    excluded: string[]
    amenities: string[]
    tourPlan: string[]
    maxGuest: number
    minAge: number
    division: { _id: string, name: string }
    tourType: { _id: string, name: string }
    createdAt: string
    updatedAt: string
    slug: string
    costFrom: number
    arrivalLocation: string
    departureLocation: string
}
