import React from 'react';

type CountryCardProps = Country

const CountryCard = ({name, area, region}: CountryCardProps) => <div
  className="mx-3 w-full rounded-sm bg-white p-2 drop-shadow-md dark:bg-gray-800 dark:text-gray-100 dark:drop-shadow-lg">
  <h1 className="text-l font-bold">{name}</h1>
  <p className="text-sm text-gray-700 dark:text-gray-300">
    <span aria-label="area" role="img">🗺</span>
    <span className="pe-2 pl-1 text-gray-500">Area:</span>
    {area?.toLocaleString()} Km<sup>2</sup></p>
  <p className="text-sm text-gray-700 dark:text-gray-300">
    <span aria-label="region" role="img">🌎</span>
    <span className="pe-2 pl-1 text-gray-500">Region:</span>
    {region}</p>
</div>;

export default CountryCard;
