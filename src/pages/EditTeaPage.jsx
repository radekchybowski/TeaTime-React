import BrewingTile from "@/components/blocks/BrewingTile";
import ContentHeader from "@/components/blocks/ContentHeader";
import { Button } from "@/components/ui/button";
import InnerContainer from "@/components/ui/innerContainer";
import { Textarea } from "@/components/ui/textarea";
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import genericFetch from '@/lib/genericFetch';
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@/App";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

export function EditTeaPage() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;
  const { id } = useParams();
  const { toast } = useToast();

  const categoryQuery = useQuery({
    queryFn: () => genericFetch({path: 'categories'}),
    queryKey: ['categories'],
  });

  const {data: teaData, isLoading, isError } = useQuery({
    queryFn: () => genericFetch({path: `teas/${id}`}),
    queryKey: ['teas'],
    retry: false
  });

  useEffect(() => {
    if (isError) {
      navigate("/404")
    }
  },[isError]);

  const {mutateAsync: editTeaMutation} = useMutation({
    mutationFn: genericFetch,
    onSuccess: () => {
      queryClient.invalidateQueries(['currentTea'])
      navigate(-1)
      toast({
        title: `Tea has been edited`,
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    }
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
    region: z.string().min(3).optional().nullable(),
    vendor: z.string().min(3).optional().nullable()
  })

  const form = useForm({
    resolver: zodResolver(addTeaSchema),
    values: {
      title: teaData?.title,
      category: `api/categories/${teaData?.category.id}`,
      description: teaData?.description,
      ingredients: teaData?.ingredients,
      steepTime: teaData?.steepTime,
      steepTemp: teaData?.steepTemp,
      region: teaData?.region,
      vendor: teaData?.vendor,

    },
  })
 
  function addTeaSubmit(values) {
    values = JSON.stringify(values)
    editTeaMutation({path: `teas/${teaData.id}`, method: 'PUT', body: values})
  }

  return (
    <>
    { user.id !== teaData?.author.id &&
        navigate(-1)
    }
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(addTeaSubmit)}>
    <div className="flex flex-col w-full gap-4">
    {isLoading ? 
        <div className="rounded-lg w-full h-screen grid place-items-center animate-pulse">
            <Spinner size="large"/>
        </div> 
        : <>
              
      <ContentHeader 
        title="Edit your tea"
      >
          <Button onClick={() => navigate(-1)} variant="outline">Cancel</Button>
          <Button>Save changes</Button>
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
              <Select  onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={teaData?.category.title} />
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
      </>
      }
    </div>
    </form>
    </Form>
    </>
  );
}

export default EditTeaPage;

