import { Button } from './button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import CategoryTile from '../blocks/CategoryTile';
import { useContext, useEffect, useState } from 'react';
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
import genericFetch from '@/hooks/genericFetch';
import ErrorPane from '../blocks/ErrorPane';
import { AuthContext } from '@/App';
import { NavLink } from 'react-router-dom';

const Section = ({title = null, fetch='teas', items=8, component, children, className, emptyError}) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [content, setContent] = useState("");
  const [header, setHeader] = useState(title);
  const [pagination, setPagination] = useState(items);
  const [showForm, setShowForm] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const { auth } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {data, isLoading, error, isError, isSuccess} = useQuery({
    queryFn: () => genericFetch({path: fetch, search: searchQuery, pagination: pagination}),
    queryKey: [fetch, searchQuery, pagination],
    onSuccess: () => {
      // console.log(pagination)
      console.log('showMore:', showMore)
    },
    cacheTime: 0
  });

  useEffect(() => {
    console.log('isSuccess:', isSuccess)
    console.log('pag:', pagination)
    console.log('showMore:', showMore)
    if (isError) {
      setContent(<ErrorPane/>)
      return
    }
    if (data?.length === 0) {
      console.log(emptyError)
      console.log(data?.length)
      setContent(emptyError)
      return
    }
    if (data?.length <= pagination) setShowMore(true)
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
  ,[isSuccess])

  const searchSchema = z.object({
    search: z.string().min(1, {
      message: "Type min. 3 characters...",
    }),
  })

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  })
 
  function searchSubmit(values) {
    if(values.search.length > 2) 
      setSearchQuery(`title=${values.search}`)
    else
      setSearchQuery("")
  }

  const clickShowMore = () => {
    setShowMore(!showMore)
    if(showMore) {
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
    if(pagination < data.length) {
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
              <form onKeyUp={form.handleSubmit(searchSubmit)}>
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Search this section</FormLabel>
                      <FormControl>
                        <Input className="h-8" placeholder="name of tea..." {...field} />
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
          <Button onClick={clickShowMore} variant="ghost" size="sm">
            {showMore ? 'Show less' : 'Show more'}
          </Button>
        </div>
      </div>
      <div className='w-full flex flex-wrap gap-4'>
      {isLoading && <div className="w-100 h-100 flex justify-center items-center text-3xl">Loading...</div>}
      {error && <ErrorPane description={error.name}/>}
      {content}
      { children }
      </div>
      {loadMore && <Button className="mt-4 block mx-auto" onClick={clickLoadMore} variant="outline" size="sm">Load more</Button>}
    </div>
  );
};

export default Section;