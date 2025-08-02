import React from 'react';

type Props = {
  search: string;
  setSearch: (val: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      className="w-full p-2 border rounded mb-4"
      placeholder="Search by name or email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
