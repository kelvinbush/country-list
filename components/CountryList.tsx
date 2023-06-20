"use client"

import React, { useCallback, useEffect, useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import getAllCountries from "@/lib/getAllCountries"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import CountryCard from "@/components/CountryCard"
import Pagination from "@/components/Pagination"

type CountryListProps = {
  countries: Country[]
}

type Checked = DropdownMenuCheckboxItemProps["checked"]

const CountryList = ({ countries }: CountryListProps) => {
  const [sort, setSort] = useState(false)
  const [filterArea, setFilterArea] = React.useState<Checked>(false)
  const [filterRegion, setFilterRegion] = React.useState<Checked>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage] = useState(10)
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])

  const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage

  const paginateFront = () => setCurrentPage(currentPage + 1)
  const paginateBack = () => setCurrentPage(currentPage - 1)

  const filterCountries = useCallback(() => {
    let filtered = countries.slice()
    if (filterArea) {
      filtered = filtered.filter((country) => country.area < 65300)
    }

    if (filterRegion) {
      filtered = filtered.filter((country) => country.region === "Oceania")
    }

    if (sort) {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredCountries(filtered)
    setCurrentPage(1)
  }, [countries, filterArea, filterRegion, sort])

  useEffect(() => {
    filterCountries()
  }, [filterArea, filterCountries, filterRegion, sort])

  useEffect(() => {
    setFilteredCountries(countries)
  }, [countries])

  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  )

  return (
    <>
      <div className="flex w-full items-center space-x-2">
        <div className="flex w-full items-center justify-between">
          <div className={"flex items-center gap-2"}>
            <Label htmlFor="sort-by-name">Sort by name</Label>
            <Switch
              id="sort-by-name"
              name="sort-by-name"
              checked={sort}
              onCheckedChange={() => setSort(!sort)}
            />
          </div>
          <div className={"flex items-center gap-2"}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Filter By:</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Area</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filterArea}
                  onCheckedChange={setFilterArea}
                >
                  Smaller than Lithuania
                </DropdownMenuCheckboxItem>
                <DropdownMenuLabel>Region</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filterRegion}
                  onCheckedChange={setFilterRegion}
                >
                  Oceania
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {currentCountries.map((country) => (
        <CountryCard
          key={country.name}
          area={country.area}
          name={country.name}
          region={country.region}
        />
      ))}
      <Pagination
        paginateFront={paginateFront}
        paginateBack={paginateBack}
        currentPage={currentPage}
        countriesPerPage={10}
        totalCountries={filteredCountries.length}
      />
    </>
  )
}

export default CountryList

export async function getStaticProps() {
  const countriesData: Promise<Country[]> = getAllCountries()

  const countries = await countriesData

  return {
    props: {
      countries,
    },
  }
}
