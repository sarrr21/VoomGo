export function getStatusColor(status: string) {
  switch (status) {
    case "Available":
      return "bg-[#B2FFB4] text-green-800"
    case "Offline":
      return "bg-[#E1E4EA] text-gray-800"
    case "Suspended":
      return "bg-[#FFDCDC] text-red-800"
    default:
      return "bg-gray[#E1E4EA] text-gray-800"
  }
}

export function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating))
}
