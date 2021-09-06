import useAuth from '../../hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { apiService } from '../../core/services/api/api-service';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../store/like';

const Account = () => {
  const dispatch = useDispatch();
  const favs = useSelector(state => state.fav.value);
  const auth = useAuth();
  const [card, setCard] = useState([]);

  const handleFav = (e, id) => {
    e.preventDefault();
    const newCard = card.map(e => {
      if (e.id === id) {
        e.favs = !e.favs;
      }
      return e;
    });
    setCard(newCard);
    dispatch(toggle(id));
  }

  const handleLogout = () => {
    auth.logout();
  }

  useEffect(() => {
    apiService.get('/roles').then(e => {
      setCard(e)
    });
  }, []);

  const showList = card.filter(item => favs.find(i => item.id === i)).map(item => {
    item.favs = true;
    return item
  }) || []

  return (
    <div className="container">
      <h1>User Setting</h1>
      <div className="container">
        <ul className="product-list row">
          {
            showList.map((e, i) => (
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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Account;
