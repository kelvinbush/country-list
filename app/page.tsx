import getAllCountries from "@/lib/getAllCountries"
import CountryList from "@/components/CountryList"

export default async function IndexPage() {
  const countriesData: Promise<Country[]> = getAllCountries()

  const countries = await countriesData

  return (
    <section className="container grid items-center gap-6 pb-8 pt-2 md:py-5">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <p className="text-gray-500">
          A list of countries and their basic information.
        </p>
        <CountryList countries={countries} />
      </div>
    </section>
  )
}
