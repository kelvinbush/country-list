export default async function getAllCountries() {
  const res = await fetch(
    "https://restcountries.com/v2/all?fields=name,region,area"
  )
  if (!res.ok) throw new Error("failed to fetch data")
  return res.json()
}
