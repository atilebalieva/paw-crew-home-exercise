import ZipCodeFilter from "@/components/SearchPage/LocationSearch/ZipCodeFilter";
import CityFilter from "@/components/SearchPage/LocationSearch/CityFilter";
import StateFilter from "@/components/SearchPage/LocationSearch/StateFilter";

const LocationSearch = () => {
  return (
    <div className="flex justify-between mb-6 ">
      {" "}
      <ZipCodeFilter />
      <CityFilter />
      <StateFilter />
    </div>
  );
};

export default LocationSearch;
