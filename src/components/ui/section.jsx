import useFetch from '@/hooks/useFetch';
import { Button } from './button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import CategoryTile from '../blocks/CategoryTile';

const Section = ({title, fetch, component, children, className}) => {

  const {data, isLoading} = useFetch(fetch)

  return (
    <div className={`w-full ${className}`}>
      <div className='flex justify-between mb-3'>
        <h2>{title}</h2>
        <div className='flex p-0'>
          <Button variant="ghost" size="sm"><FaMagnifyingGlass/></Button>
          <Button variant="ghost" size="sm">Show more</Button>
        </div>
      </div>
      <div className='w-full flex flex-wrap gap-4'>
      {isLoading && <div className="w-100 h-100 flex justify-center items-center text-3xl">Loading...</div>}
      {data?.map((entity) => {
        return <CategoryTile key={entity.id} properties={entity} image="img/tea-placeholder.jpg"/>
        // <div key={entity.id}>{entity.title}</div>
      })}
        { children }
      </div>
    </div>
  );
};

export default Section;