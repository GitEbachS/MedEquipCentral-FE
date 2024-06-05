import { useEffect, useState } from 'react';
import { getFavoritesList } from '../api/favoritesListData';
import { useAuth } from '../utils/context/authContext';
import FavoritesProductCard from '../components/ProductFavCard';

export default function FavoritesList() {
  const [favList, setFavList] = useState([]);
  const { user } = useAuth();

  const viewList = () => {
    getFavoritesList(user.id).then(setFavList);
  };

  useEffect(() => {
    viewList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      {!favList.length ? <h2>Nothing has been added to your Favorites List</h2> : null}
      {favList && favList.map((category) => (
        <div key={category.category}>
          <h3>{category.category}</h3>
          {category.products.map((product) => (
            <FavoritesProductCard key={product.id} productObj={product} onUpdate={viewList} />
          ))}
        </div>
      ))}
    </div>
  );
}
