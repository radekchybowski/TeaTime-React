import BrewingTile from "@/components/blocks/BrewingTile";
import Comment from "@/components/blocks/Comment";
import ContentHeader from "@/components/blocks/ContentHeader";
import { Button } from "@/components/ui/button";
import InnerContainer from "@/components/ui/innerContainer";
import Rating from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { FaBalanceScaleLeft } from "react-icons/fa";

const TeaPage = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <ContentHeader 
        image="img/tea-placeholder.jpg" 
        title="Pure Angel"
        second="White tea"
        third={<Rating />}
      >
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline" size="icon">Edit</Button>
          <Button variant="outline">Edit</Button>
          <Button variant="warning">Delete</Button>
      </ContentHeader>
      <InnerContainer>
        <h3>Description</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit eaque iusto consectetur corrupti libero!</p>
        <p>A atque magni sit ullam ad doloremque dolorem ratione impedit exercitationem amet quia deserunt repellendus repellat aliquam enim, quam aut quae error ipsam vel maxime. Vitae.</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Ingredients</h3>
        <p>pineapple, sunflowers, matcha, oolong, roses, majeranek</p>
        <p><b>Region </b>Japan</p>
        <p><b>Store </b>e-herbata.pl</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Brewing</h3>
        <div className="flex flex-wrap gap-2.5">
          <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="amount"
            content="5-6 g"
          />
          <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="amount"
            content="5-6 g"
          />
          <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="amount"
            content="5-6 g"
          />
          <BrewingTile
            icon={<FaBalanceScaleLeft />}
            title="amount"
            content="5-6 g"
          />
        </div>
      </InnerContainer>
      <InnerContainer>
        <h3>Tags</h3>
        <div className="flex flex-wrap gap-2.5">
          <Button className="bg-tile text-secondary-foreground hover:bg-tile/50" size="sm">christmas time</Button>
          <Button className="bg-tile text-secondary-foreground" size="sm">christmas time</Button>
          <Button className="bg-tile text-secondary-foreground" size="sm">christmas time</Button>
          <Button className="bg-tile text-secondary-foreground" size="sm">christmas time</Button>
          </div>
      </InnerContainer>
      <InnerContainer>
        <p><b>Author </b>@nickname</p>
        <p><b>Last update </b>2024-04-11</p>
      </InnerContainer>
      <InnerContainer>
        <h3>Your notes</h3>
        <Textarea/>
        <Button className="w-fit">Save</Button>
      </InnerContainer>
      <InnerContainer>
        <h3>Comments</h3>
        <Comment
          content="Reiciendis et qui corporis. Aut nostrum distinctio similique autem ut voluptas. Sit et dolore ipsum laudantium dolore sit quaerat. Est doloribus architecto ut doloremque numquam qui. Ducimus placeat repellendus occaecati tempore."
          nickname="@nickname"
          date="August 7th at 1:33pm"
        />
        <Comment
          content="Reiciendis et qui corporis. Aut nostrum distinctio similique autem ut voluptas. Sit et dolore ipsum laudantium dolore sit quaerat. Est doloribus architecto ut doloremque numquam qui. Ducimus placeat repellendus occaecati tempore."
          nickname="@nickname"
          date="August 7th at 1:33pm"
        />
        <Comment
          content="Reiciendis et qui corporis. Aut nostrum distinctio similique autem ut voluptas. Sit et dolore ipsum laudantium dolore sit quaerat. Est doloribus architecto ut doloremque numquam qui. Ducimus placeat repellendus occaecati tempore."
          nickname="@nickname"
          date="August 7th at 1:33pm"
        />
        <Textarea placeholder="Type your message here..."/>
        <Button className="w-fit">Save</Button>
      </InnerContainer>

    </div>
  );
};

export default TeaPage;