'use client'

import React, {useState} from 'react';
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import CountryCard from "@/components/CountryCard";

type CountryListProps = {
  countries: Country[]
}

const CountryList = ({countries}: CountryListProps) => {
  const [sort, setSort] = useState(false);
  const sortCountries = () => {
    if (sort) {
      countries.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      countries.sort((a, b) => b.name.localeCompare(a.name));
    }
    setSort(!sort);
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch id="sort-by-name"
                name="sort-by-name"
                checked={sort}
                onCheckedChange={sortCountries}
        />
        <Label htmlFor="sort-by-name">Sort by name</Label>
      </div>
      {
        countries.map((country) => (
          <CountryCard key={country.name} area={country.area} name={country.name} region={country.region}/>
        ))
      }
    </>);
};

export default CountryList;
