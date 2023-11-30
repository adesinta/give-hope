const EditModal = ({children}) => {
    return (
        <div className="font-poppins fixed inset-0 bg-black bg-opacity-40 w-full flex justify-center items-center z-20">
          <div className="w-[1000px] lg:m-auto bg-white md:rounded-[8px] rounded-[4px] m-5 p-10">
            {children}
          </div>
        </div>
      );
}

export default EditModal