import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import genericFetch from "@/lib/genericFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useContext } from "react";
import { AuthContext } from "@/App";
import deleteFetch from "@/lib/deleteFetch";
import { toast } from "../ui/use-toast";



export default function ButtonRating({teaId, userId}) {
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;

  const queryClient = useQueryClient();
  
  const {data: rating} = useQuery({
    queryFn: () => genericFetch({path: 'ratings', search: `tea.id=${teaId}&author.id=${user.id}`}),
    queryKey: ['rating'],
    enabled: !!user,
    cacheTime: 0
  });

  const {mutateAsync: ratingMutation} = useMutation({
    mutationFn: genericFetch,
    onSuccess: () => {
      queryClient.invalidateQueries(['rating'])
      toast({
        title: "Rating has been changed."
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

  const {mutateAsync: ratingDeleteMutation} = useMutation({
    mutationFn: deleteFetch,
    onSuccess: () => {
      queryClient.invalidateQueries(['rating'])
      toast({
        title: "Rating has been deleted."
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

  const handleSelectChange = (value) => {
    let method = 'POST'
    let path = 'ratings'

    let body = JSON.stringify({
      rating: value, 
      tea: `api/teas/${teaId}`, 
      author: `api/users/${userId}`
    })

    if(rating.length && value === null) {
      path = `ratings/${rating[0].id}`
      ratingDeleteMutation(path)
      return;
    }

    if(rating.length && value !== null) {
      method = 'PUT'
      path = `ratings/${rating[0].id}`
    }

    ratingMutation({
      path: path, 
      method: method, 
      body: body
    })
  }

  return (
      <Popover>
        <PopoverTrigger>
          <Button variant="outline" size="icon">
            {rating ? rating.length ? rating[0].rating : <FaRegStarHalfStroke /> : <FaRegStarHalfStroke />}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="">
              <SelectValue placeholder="Rate this tea" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>Not rated</SelectItem>
              <SelectItem value={1}>{1}</SelectItem>
              <SelectItem value={2}>{2}</SelectItem>
              <SelectItem value={3}>{3}</SelectItem>
              <SelectItem value={4}>{4}</SelectItem>
              <SelectItem value={5}>{5}</SelectItem>
              <SelectItem value={6}>{6}</SelectItem>
              <SelectItem value={7}>{7}</SelectItem>
              <SelectItem value={8}>{8}</SelectItem>
              <SelectItem value={9}>{9}</SelectItem>
              <SelectItem value={10}>{10}</SelectItem>
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>
  );
}