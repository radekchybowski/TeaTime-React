import { AuthContext } from "@/App";
import Alert from "@/components/blocks/Alert";
import BrewingTile from "@/components/blocks/BrewingTile";
import ButtonRating from "@/components/blocks/ButtonRating";
import Comment from "@/components/blocks/Comment";
import CommentsWidget from "@/components/blocks/CommentsWidget";
import ContentHeader from "@/components/blocks/ContentHeader";
import NotesWidget from "@/components/blocks/NotesWidget";
import { Button } from "@/components/ui/button";
import InnerContainer from "@/components/ui/innerContainer";
import Rating from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import formatDate from "@/hooks/formatDate";
import genericFetch from "@/hooks/genericFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function TeaPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;
  
  const { toast } = useToast();
  const { id } = useParams();
  const teaPath = `teas/${id}`;

  const {data: tea, isLoading: isTeaLoading, isError} = useQuery({
    queryFn: () => genericFetch({path: teaPath}),
    queryKey: [teaPath],
    cacheTime: 0,
    retry: false
  });

  useEffect(() => {
    if (isError) {
      navigate("/404")
    }
  },[isError]);

  const deleteTea = () => {
    try {
      genericFetch({ path: teaPath, method: 'DELETE'});
      queryClient.invalidateQueries([])
      navigate(-1)
      toast({
        title: `Tea ${tea?.title} has been deleted`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    }
  }

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
          <ButtonRating teaId={ id } userId={ user.id }/>
          { user.id === tea?.author.id && 
            <>
              <Button variant="outline"><Link to={`/edit-tea/${tea?.id}`}>Edit</Link></Button>
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
            <Button key={tag?.id} className="bg-tile text-secondary-foreground hover:bg-tile/50" size="sm">{tag.title}</Button>
          ))}
          </div>
      </InnerContainer>
      <InnerContainer>
        <p><b>Author </b>{tea?.author.email}</p>
        <p><b>Last update </b>{formatDate(tea?.updatedAt)}</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Your notes</h3>
        <NotesWidget tea={tea}/>
      </InnerContainer>
      <InnerContainer>
        <h3>Comments</h3>
        {tea && <CommentsWidget tea={tea}/>}
      </InnerContainer>
    </div>
  );
}