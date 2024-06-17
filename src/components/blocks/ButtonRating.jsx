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
import { useState } from "react";



export default function ButtonRating({teaId, userId}) {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(0);
  
  const {data: rating, isLoading} = useQuery({
    queryFn: () => genericFetch({path: 'ratings', search: `tea.id=${teaId}&author.id=${userId}`}),
    queryKey: ['rating'],
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
    const body = JSON.stringify({
      rating: value, 
      tea: `api/teas/${teaId}`, 
      author: `api/users/${userId}`
    })
    ratingMutation({
      path: 'ratings', 
      method: 'POST', 
      body: body,
    })
  }

  return (
      <Popover>
        <PopoverTrigger>
          <Button variant="outline" size="icon">
            {rating?.rating ? rating?.rating : <FaRegStarHalfStroke />}
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