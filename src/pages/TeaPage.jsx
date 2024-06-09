import BrewingTile from "@/components/blocks/BrewingTile";
import Comment from "@/components/blocks/Comment";
import ContentHeader from "@/components/blocks/ContentHeader";
import { Button } from "@/components/ui/button";
import InnerContainer from "@/components/ui/innerContainer";
import Rating from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import genericFetch from "@/hooks/genericFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";


const TeaPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {id} = useParams();
  const path = `teas/${id}`;
  const {data, isLoading} = useQuery({
    queryFn: () => genericFetch({path: path}),
    queryKey: [path],
    cacheTime: 0
  });

  const deleteTea = () => {
      genericFetch({ path: path, method: 'DELETE' });
      console.log('usuniete');
      queryClient.invalidateQueries()
      navigate('/')
  }
  

  return (
    <div className="flex flex-col w-full gap-4">
      {isLoading && "Loading..."}
      <ContentHeader 
        image="../img/tea-placeholder.jpg" 
        title={data?.title}
        second={data?.category.title}
        third={<Rating />}
      >
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline">Edit</Button>
          <Button onClick={() => {deleteTea()}} variant="warning">Delete</Button>
      </ContentHeader>
      <InnerContainer>
        <h3>Description</h3>
        <p>{data?.description}</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Ingredients</h3>
        <p>{data?.ingredients}</p>
        <p><b>Region </b>{data?.region}</p>
        <p><b>Store </b>{data?.vendor}</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Brewing</h3>
        <div className="flex flex-wrap gap-2.5">
          <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="time"
            content={`${data?.steepTime} min`}
          />
          <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="temperature"
            content={`${data?.steepTemp} °C`}
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
          {data?.tags.map(tag => (
            <Button key={tag.id} className="bg-tile text-secondary-foreground hover:bg-tile/50" size="sm">{tag.title}</Button>
          ))}
          </div>
      </InnerContainer>
      <InnerContainer>
        <p><b>Author </b>{data?.author.email}</p>
        <p><b>Last update </b>{data?.createdAt}</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Your notes</h3>
        <Textarea/>
        <Button className="w-fit">Save</Button>
      </InnerContainer>
      <InnerContainer>
        <h3>Comments</h3>
        {data?.comments.map(comment => (
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

export default TeaPage;