import BrewingTile from "@/components/blocks/BrewingTile";
import ContentHeader from "@/components/blocks/ContentHeader";
import { Button } from "@/components/ui/button";
import InnerContainer from "@/components/ui/innerContainer";
import { Textarea } from "@/components/ui/textarea";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaThermometerHalf } from "react-icons/fa";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import genericFetch from '@/hooks/genericFetch';
import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";

export function AddTeaPage() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;

  const categoryQuery = useQuery({
    queryFn: () => genericFetch({path: 'categories'}),
    queryKey: ['categories'],
    // cacheTime: 0
  });

  const {mutateAsync: addTeaMutation} = useMutation({
    mutationFn: genericFetch,
    onSuccess: () => {
      queryClient.invalidateQueries(['teas'])
      console.log('success')
      navigate(-1)
    },
    onError: (error) => console.error(error)
  })

  const addTeaSchema = z.object({
    title: z.string()
    .min(3, {
      message: "Title must have at least three characters.",
    })
    .max(255, {
      message: "Title must have less than 255 characters."
    }),
    category: z.string().min(1, {
      required_error: "Category must be selected.",
    }),
    description: z.string().min(20, {
      message: "Write at least couple of words.",
    }),
    ingredients: z.string().min(3),
    steepTime: z.coerce.number().min(1),
    steepTemp: z.coerce.number().min(1),
    region: z.string().min(3).optional(),
    vendor: z.string().min(3).optional()
  })

  const form = useForm({
    resolver: zodResolver(addTeaSchema),
    defaultValues: {
      title: "",
    },
  })
 
  function addTeaSubmit(values) {
    values = {...values, author: `api/users/${user.id}`}
    values = JSON.stringify(values)
    addTeaMutation({path: 'teas', method: 'POST', body: values})
    console.log(values)
  }






  return (
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(addTeaSubmit)}>
    <div className="flex flex-col w-full gap-4">
              
      <ContentHeader title="Add new tea">
          <Button onClick={() => navigate(-1)} variant="outline">Cancel</Button>
          <Button>Save tea</Button>
      </ContentHeader>

      <InnerContainer>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Tea name (title)</FormLabel>
              <FormControl>
                <Input className="h-10" placeholder="Name of tea..." {...field} />
              </FormControl>
              <FormDescription className="">
                Name should be descriptive (and unique).
              </FormDescription>
              <FormMessage className=""/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category (kind)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryQuery.data?.map(category => (
                    <SelectItem key={category.id} value={`api/categories/${category.id}`}>{category.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select category (kind) of this tea.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </InnerContainer>

      <InnerContainer>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write something more about that tea you love soooo much."
                  {...field}
                />
              </FormControl>
              <FormDescription className="">
                
              </FormDescription>
              <FormMessage className=""/>
            </FormItem>
          )}
        />
        
      </InnerContainer>
      <InnerContainer>
        <h3>Brewing</h3>
        <div className="flex flex-wrap gap-2.5">
          <FormField
            control={form.control}
            name="steepTime"
            render={({ field }) => (
              <FormItem className="flex-1 text-center">
                <BrewingTile className="min-w-72"
                  icon={<FaRegClock />}
                  title={<FormDescription>Time range (in minutes) for how long you should steep this tea.</FormDescription>}
                  content={
                    <>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="number" className="h-10" placeholder="3-4" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </>
                  }
                /> 
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="steepTemp"
            render={({ field }) => (
              <FormItem className="flex-1 text-center">
                <BrewingTile className="min-w-72"
                  icon={<FaThermometerHalf />}
                  title={<FormDescription>Temperature range or value (in Celsius).</FormDescription>}
                  content={
                    <>
                      <FormLabel>Temperature</FormLabel>
                      <FormControl>
                        <Input type="number" className="h-10" placeholder="75-85" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </>
                  }
                /> 
              </FormItem>
            )}
          />
        </div>
      </InnerContainer>

      <InnerContainer>
      <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Ingredients</FormLabel>
              <FormControl>
                <Textarea className="min-h-16" placeholder="white tea, pai mu tan, cranberries, lavender..." {...field} />
              </FormControl>
              <FormDescription className="">
                Please separate each ingredient with a comma.
              </FormDescription>
              <FormMessage className=""/>
            </FormItem>
          )}
        />
        <div className="flex flex-wrap gap-4">
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="">Region</FormLabel>
              <FormControl>
                <Input className="h-10" placeholder="Ceylon" {...field} />
              </FormControl>
              <FormDescription className="">
                Place of origin for this tea.
              </FormDescription>
              <FormMessage className=""/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vendor"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="">Store</FormLabel>
              <FormControl>
                <Input className="h-10" placeholder="e-herbata.pl" {...field} />
              </FormControl>
              <FormDescription className="">
                Store where you have got this tea!
              </FormDescription>
              <FormMessage className=""/>
            </FormItem>
          )}
        />
        </div>
      </InnerContainer>
    </div>
    </form>
    </Form>
  );
};

export default AddTeaPage;

