
const ContentHeader = ({children, image, title, second, third}) => {
  return (
    <>
      <header className="blurred-bg-img z-20 relative flex flex-wrap items-end justify-center w-full p-6 gap-4 rounded-md overflow-clip">
        <div className="absolute top-0 left-0 w-full h-full scale-105">
          <img className="blurred-bg-img w-full h-full object-cover blur-md" src={image} alt="Placeholder photo for tea page - shows tea cup in the leaves." />
          <div className="absolute top-0 left-0 z-10 w-full h-full bg-white opacity-50"></div>
        </div>
        
        <img className="z-10 size-52 rounded-lg object-cover shadow-sm" src={image} alt="Placeholder photo for tea page - shows tea cup in the leaves." />
        <div className="z-10">
         {third}
         <h3 className='text-2xl font-medium'>{title}</h3>
         <span className='text-xl text-primary'>{second}</span>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center mx-auto sm:mr-0 sm:ml-auto sm:justify-start z-10">
          {children}
        </div>
        
      </header>
    </>
  );
};

export default ContentHeader;