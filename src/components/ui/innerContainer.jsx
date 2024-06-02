
const InnerContainer = ({children, className}) => {
    return (
      <div className={`flex flex-col justify-center p-4 gap-2.5 rounded-md bg-card ${className}`}>
        { children }
      </div>
    );
};

export default InnerContainer;