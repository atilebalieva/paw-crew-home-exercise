import SelectLocation from "./SelectLocation";

const ZipCodeFilter = () => {
  return (
    <div>
      <SelectLocation
        results={[1, 2, 3]}
        handleClick={() => {
          console.log(true);
        }}
        selectedValue={"00000"}
        title={"Zip Codes"}
      />
    </div>
  );
};

export default ZipCodeFilter;
