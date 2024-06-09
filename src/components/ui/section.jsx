import useFetch from '@/hooks/useFetch';
import { Button } from './button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import CategoryTile from '../blocks/CategoryTile';
import { useEffect, useState } from 'react';
import { Tile } from './tile';
import CardTea from '../blocks/CardTea';

const Section = ({title = null, fetch='teas', component, children, className}) => {

  const {data, isLoading} = useFetch(fetch);
  const [content, setContent] = useState("");
  const [header, setHeader] = useState(title);
  useEffect(() => {

    const content = data?.map((entity) => {
      console.log(entity.id)
      if('categories' == component) return <CategoryTile key={entity.id} properties={entity} image="img/tea-placeholder.jpg"/>
      if('collections' == component) return <Tile key={entity.id}>{entity.title}</Tile>
      if('teas' == component) {
        if(!title)  setHeader(data[0].category.title)
        return <CardTea key={entity.id} properties={entity}/>
      }
    })
    setContent(content)
  }
  ,[data])

  return (
    <div className={`w-full ${className}`}>
      <div className='flex justify-between mb-3'>
        <h2>{header}</h2>
        <div className='flex p-0'>
          <Button variant="ghost" size="sm"><FaMagnifyingGlass/></Button>
          <Button variant="ghost" size="sm">Show more</Button>
        </div>
      </div>
      <div className='w-full flex flex-wrap gap-4'>
      {isLoading && <div className="w-100 h-100 flex justify-center items-center text-3xl">Loading...</div>}
      {content}
      { children }
      </div>
    </div>
  );
};

export default Section;