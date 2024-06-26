import { AuthContext } from "@/App";
import Alert from "@/components/blocks/Alert";
import BrewingTile from "@/components/blocks/BrewingTile";
import ButtonRating from "@/components/blocks/ButtonRating";
import Comment from "@/components/blocks/Comment";
import ContentHeader from "@/components/blocks/ContentHeader";
import { Button } from "@/components/ui/button";
import InnerContainer from "@/components/ui/innerContainer";
import Rating from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import genericFetch from "@/hooks/genericFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function TeaPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { id } = useParams();
  const path = `teas/${id}`;

  const {data: tea, isLoading: isTeaLoading} = useQuery({
    queryFn: () => genericFetch({path: path}),
    queryKey: [path],
    cacheTime: 0
  });

  const {data: user, isFetched: isUserFetched } = useQuery({
    queryFn: () => genericFetch({path: 'users', search: `email=${localStorage.getItem('user')}`}),
    queryKey: ['userTea'],
    cacheTime: 0
  });



  const deleteTea = () => {
    try {
      genericFetch({ path: path, method: 'DELETE'});
      queryClient.invalidateQueries([])
      navigate('/')
      toast({
        title: `Tea ${tea?.title} been deleted`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    }
  }
  useEffect(() => {console.log(user)}, [user])

  return (
    <div className="flex flex-col w-full gap-4">
      {isTeaLoading && "Loading..."}
      <ContentHeader 
        image="../img/tea-placeholder.jpg" 
        title={tea?.title}
        second={<Link to={`/categories/${tea?.category.id}`}>{tea?.category.title}</Link>}
        third={<Rating>{tea?.currentRating}</Rating>}
      >
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline" size="icon">Edit</Button>
          {isUserFetched && !isTeaLoading && <ButtonRating teaId={tea?.id} userId={user[0].id}/>}
          { localStorage.getItem('user') === tea?.author.email && 
            <>
              <Button variant="outline">Edit</Button>
              <Alert
                title="Are you absolutely sure?"
                description="You are going to delete tea. This action cannot be undone."
                actionButton={
                  <Button onClick={() => {deleteTea()}} variant="destructive">Delete tea</Button>
                }
              >
                <Button variant="warning">Delete</Button>
              </Alert> 
            </>
          }
      </ContentHeader>
      <InnerContainer>
        <h3>Description</h3>
        <p>{tea?.description}</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Ingredients</h3>
        <p>{tea?.ingredients}</p>
        <p><b>Region </b>{tea?.region}</p>
        <p><b>Store </b>{tea?.vendor}</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Brewing</h3>
        <div className="flex flex-wrap gap-2.5">
          <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="time"
            content={`${tea?.steepTime} min`}
          />
          <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="temperature"
            content={`${tea?.steepTemp} °C`}
          />
          {/* <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="amount"
            content="5-6 g"
          />
          <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="amount"
            content="5-6 g"
          /> */}
        </div>
      </InnerContainer>
      <InnerContainer>
        <h3>Tags</h3>
        <div className="flex flex-wrap gap-2.5">
          {tea?.tags.map(tag => (
            <Button key={tag.id} className="bg-tile text-secondary-foreground hover:bg-tile/50" size="sm">{tag.title}</Button>
          ))}
          </div>
      </InnerContainer>
      <InnerContainer>
        <p><b>Author </b>{tea?.author.email}</p>
        <p><b>Last update </b>{tea?.createdAt}</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Your notes</h3>
        <Textarea/>
        <Button className="w-fit">Save</Button>
      </InnerContainer>
      <InnerContainer>
        <h3>Comments</h3>
        {tea?.comments.map(comment => (
          <Comment key={comment.id}
            content={comment.content}
            nickname={comment.author.name + " " + comment.author.surname}
            date={comment.createdAt}
          />
        ))}
        <Textarea placeholder="Type your message here..."/>
        <Button className="w-fit">Save</Button>
      </InnerContainer>

    </div>
  );
};