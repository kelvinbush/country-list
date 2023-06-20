import getAllCountries from "@/lib/getAllCountries";
import CountryCard from "@/components/CountryCard";

export default async function IndexPage() {
  const countriesData: Promise<Country[]> = getAllCountries();

  const countries = await countriesData;

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-4xl font-bold">Countries</h1>
        <p className="text-gray-500">
          A list of countries and their basic information.
        </p>
        {
          countries.map((country) => (
            <CountryCard area={country.area} name={country.name} region={country.region}/>
          ))
        }
      </div>
    </section>
  )
}
