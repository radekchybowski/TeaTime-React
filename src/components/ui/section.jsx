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
import { useQuery } from '@tanstack/react-query';
import genericFetch from '@/hooks/genericFetch';

const Section = ({title = null, fetch='teas', component, children, className}) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [content, setContent] = useState("");
  const [header, setHeader] = useState(title);
  const [showForm, setShowForm] = useState(false);

  const {data, isLoading} = useQuery({
    queryFn: () => genericFetch({path: fetch, search: searchQuery}),
    queryKey: [fetch, {searchQuery}],
    // cacheTime: 0
  });

  useEffect(() => {

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
  ,[data])

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