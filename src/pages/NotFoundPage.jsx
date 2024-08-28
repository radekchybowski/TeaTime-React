import { TbFileSad } from "react-icons/tb";

const NotFoundPage = () => {
    return (
      <>
        <div className='h-full flex justify-center items-center'>
          <div className="flex items-center flex-col">
            <TbFileSad size="100"/>
            <h2 className='text-3xl mt-5'>Ooops, 404</h2>
            <h3 className='text-2xl mt-5'>Page you are looking for has not been found</h3>
          </div>
        </div>
      </>
    );
};

export default NotFoundPage;