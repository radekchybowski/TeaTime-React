import { Button } from './button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import CategoryTile from '../blocks/CategoryTile';
import { useEffect, useState } from 'react';
import { Tile } from './tile';
import CardTea from '../blocks/CardTea';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import genericFetch from '@/lib/genericFetch';
import ErrorPane from '../blocks/ErrorPane';
import { Spinner } from './spinner';

const Section = ({title = null, fetch='teas', items=10, component, children, className, emptyError}) => {

  const [searchQuery, setSearchQuery] = useState(null);
  const [content, setContent] = useState("");
  const [header, setHeader] = useState(title);
  const [pagination, setPagination] = useState(items);
  const [showForm, setShowForm] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showMoreState, setShowMoreState] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const queryClient = useQueryClient();

  const {data, isLoading, error, isError, isSuccess} = useQuery({
    queryFn: () => genericFetch({path: fetch, search: searchQuery, pagination: pagination}),
    queryKey: [fetch, searchQuery, pagination]
  });

  useEffect(() => {
    if (isError) {
      setContent(<ErrorPane/>)
      return
    }
    if (data?.length === 0) {
      setContent(emptyError)
      return
    }
    const content = data?.map((entity) => {
      if('categories' == component) return <CategoryTile key={entity.id} properties={entity} image="img/tea-placeholder.jpg"/>
      if('collections' == component) return <Tile key={entity.id}>{entity.title}</Tile>
      if('teas' == component) {
        if(!title)  setHeader(data[0].category.title)
        return <CardTea key={entity.id} properties={entity}/>
      }
    })
    setContent(content)
  }
  ,[isSuccess, data])

  const searchSchema = z.object({
    search: z.string().min(0, {
      message: "Type min. 3 characters...",
    }),
  })

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  })
 
  function searchSubmit({search}) {
    if(search.length > 2) 
      setSearchQuery(`title=${search}`)
    else {
      setSearchQuery("")
      queryClient.invalidateQueries([fetch])
    }
      
  }

  const clickShowMore = () => {
    setShowMoreState(!showMoreState)
    if(showMoreState) {
      setPagination(items)
      setLoadMore(false)
    } else {
      setPagination(items * 2)
      setLoadMore(true)
      queryClient.invalidateQueries([fetch])
    }
    if(pagination > data.length) setLoadMore(false)
  }

  const clickLoadMore = () => {
    if(pagination <= data.length) {
      setPagination(pagination + items)
      queryClient.invalidateQueries([fetch])
    }
    else setLoadMore(false)
  }

  return (
    <div className={`w-full ${className}`}>
      <div className='flex flex-wrap justify-between items-center mb-3'>
        <h2>{header}</h2>
        <div className='flex p-0 items-center '>
          {showForm && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(searchSubmit)} onKeyUp={form.handleSubmit(searchSubmit)}>
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Search this section</FormLabel>
                      <FormControl>
                        <Input className="h-8" placeholder="name of tea... (min. 3 char.)" {...field} />
                      </FormControl>
                      <FormDescription className="hidden">
                        Use this field to search through teas in section {header}.
                      </FormDescription>
                      <FormMessage className="hidden"/>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
          <Button onClick={() => setShowForm(!showForm)} variant="ghost" size="sm"><FaMagnifyingGlass/></Button>
          {showMore && <Button onClick={clickShowMore} variant="ghost" size="sm">
            {showMoreState ? 'Show less' : 'Show more'}
          </Button>}
        </div>
      </div>
      <div className='w-full flex flex-wrap gap-4'>
      {isLoading && 
      <>
        <div className="bg-white rounded-lg w-full h-80 grid place-items-center animate-pulse">
          <Spinner size="large"/>
        </div>
      </>
      }
      { error && <ErrorPane description={error.name}/> }
      { content }
      { children }
      </div>
      {loadMore && <Button className="mt-4 block mx-auto" onClick={clickLoadMore} variant="outline" size="sm">Load more</Button>}
    </div>
  );
};

export default Section;