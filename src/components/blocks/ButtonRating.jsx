import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import genericFetch from "@/hooks/genericFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/App";



export default function ButtonRating({teaId, userId}) {
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;

  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(0);
  
  const {data: rating, isFetching, isFetched} = useQuery({
    queryFn: () => genericFetch({path: 'ratings', search: `tea.id=${teaId}&author.id=${user.id}`}),
    queryKey: ['rating'],
    enabled: !!user,
    cacheTime: 0
  });

  const {mutateAsync: ratingMutation} = useMutation({
    mutationFn: genericFetch,
    onSuccess: () => {
      queryClient.invalidateQueries(['rating'])
      console.log('success')
    },
    onError: (error) => console.error(error)
  })

  const handleSelectChange = (value) => {
    setSelected(value)
    let method = 'POST'
    let path = 'ratings'

    if(rating.length) {
      method = 'PUT'
      path = `ratings/${rating[0].id}`
    }

    const body = JSON.stringify({
      rating: value, 
      tea: `api/teas/${teaId}`, 
      author: `api/users/${userId}`
    })

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
            {rating ? rating.length ?rating[0].rating : <FaRegStarHalfStroke /> : <FaRegStarHalfStroke />}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="">
              <SelectValue placeholder="Rate this tea" />
            </SelectTrigger>
            <SelectContent>
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