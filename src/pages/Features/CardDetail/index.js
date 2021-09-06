import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { apiService } from '../../../core/services/api/api-service';
import { toggle } from '../../../store/like';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const CardDetail = () => {
  const [card, setCard] = useState({});
  const favs = useSelector(state => state.fav.value);
  const history = useHistory();
  const auth = useAuth();

  const handleFav = (e, id) => {
    e.preventDefault();
    if (!auth.isLogged) {
      history.push('/auth/login')
    }
    const newCard = {
      ...card,
      favs: !card.favs
    }
    setCard(newCard);
    dispatch(toggle(id));
  }
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    apiService.get('/roles').then(e => {
      let card = e.find(x => x.id === +id)
      if (favs.includes(card.id)) {
        card = {...card, favs: true}
      } else {
        card = {...card, favs: false}
      }
      setCard(card)
    });
  }, [id, favs]);
  return (
    <div className="container">
      <ul className="product-list row">
        <li className="product-item col-medium-3">
          <div className="product-img">
            <img src={`https://sandbox.werewolves-assistant-api.antoinezanardi.fr/img/roles/${card.name === 'villager-villager' ? 'villager': card.name}.png`} alt="product" />
            <span className={`product-fav ${card.favs ? 'active' : ''}`} onClick={(event) => handleFav(event, card.id)}><FaHeart /></span>
          </div>
          <h4 className="product-name">{card.name}</h4>
          <p className="product-desc">{card.description}.</p>
        </li>
      </ul>
    </div>
  );
}

export default CardDetail;
