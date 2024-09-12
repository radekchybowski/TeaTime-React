import Rating from '../ui/rating';
import { Link } from 'react-router-dom';

export default function CardTea({properties: { id, title, category, ingredients, currentRating}}) {

    return (
        <div className='flex-1 text-left min-w-96 sm:min-w-44 sm:max-w-96 bg-card rounded-lg overflow-hidden shadow-md'>
          <img className="h-24 w-full object-cover" src="/img/teaCard-bg.jpg" alt="" />
          <div className='p-2.5 pb-4'>
            <Link to={`/teas/${id}`}>
              <div className='flex justify-between items-start'>
                <h3 className='text-2xl font-medium'>{title}</h3>
                <Rating className="mt-0.5" value={currentRating}/>
              </div>
              <Link to={`/categories/${category.id}`}>
                <span className='text-xl text-primary'>{category.title}</span>
              </Link>
              <p className='mt-1 text-wrap text-card-foreground'>{ingredients}</p>
            </Link>
          </div>
        </div>
    );
}