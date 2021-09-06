import React, {useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HeroBanner from '../../../components/HeroBanner';
import { useDispatch } from 'react-redux';
import { toggle } from '../../../store/like';
import { apiService } from '../../../core/services/api/api-service';
import useAuth from '../../../hooks/useAuth';
import {useHistory} from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const history = useHistory();

  const [prods, setProds] = useState([
    
  ]);

  const handleFav = (e, id) => {
    e.preventDefault();
    if (!auth.isLogged) {
      history.push('/auth/login')
    }

    const newProds = prods.map(e => {
      if (e.id === id) {
        e.favs = !e.favs;
      }
      return e;
    });
    setProds(newProds);
    dispatch(toggle(id));
  }

  useEffect(() => {
    apiService.get('/roles').then(e => {
      const listLiked = JSON.parse(localStorage.getItem('liked')) || []
      const newList = e.map(item => {
        if (listLiked.find(b => item.id === b)) {
          item.favs = true
        } else {
          item.favs = false
        }
        return item
      })
      setProds(newList)
    });
  }, []);

  return (
    <div>
      <HeroBanner />
      <div className="container">
        <h2>Card List</h2>
        <ul className="product-list row">
          {
            prods.map((e, i) => (
              <li key={i} className="product-item col-medium-3">
                <Link to={`/card/${e.id}`} className="product-img">
                  <img src={`https://sandbox.werewolves-assistant-api.antoinezanardi.fr/img/roles/${e.name === 'villager-villager' ? 'villager': e.name}.png`} alt="product" />
                  <span className={`product-fav ${e.favs ? 'active' : ''}`} onClick={(event) => handleFav(event, e.id)}><FaHeart /></span>
                </Link>
                <h4 className="product-name"><Link to={`/products/${e.id}`}>{e.name}</Link></h4>
                <p className="product-desc">{e.description}.</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Home;
