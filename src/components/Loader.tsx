import RingLoader from "react-spinners/RingLoader";

const IsLoading = ({ status }: { status: boolean }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <RingLoader loading={status} color="white" />
    </div>
  );
};
export default IsLoading;
