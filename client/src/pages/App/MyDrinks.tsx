import { useNavigate } from 'react-router-dom';
import AnimatedPageWrapper from '../../components/AnimatedPageWrapper';
import Card from '../../components/UI/Card';
import useAuthorization from '../../hooks/useAuthorization';
import { useContext, useEffect, useState } from 'react';
import { getMyDrinks } from '../../api/drinkAPI';
import { AppContext } from '../../App';

export default function MyDrinks() {
  const [myDrinks, setMyDrinks] = useState<Array<IDrink>>([]);
  const { getJwt } = useAuthorization();
  const navigate = useNavigate();
  const app = useContext(AppContext);

  useEffect(() => {
    async function fetch() {
      const response = await getMyDrinks(app!.id, getJwt()!);

      if (response.length) {
        setMyDrinks(response);
      }
    }
    fetch();
  }, [app, getJwt]);

  return (
    <AnimatedPageWrapper>
      <h2 style={{ marginBottom: '5rem' }}>My Drinks</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {myDrinks.map((drink, index) => (
          <Card key={drink.name + index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--secondary-200)', backgroundImage: `url(${drink.img})`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
              <h4>{drink.name}</h4>
            </div>
            <button onClick={() => navigate(`/app/drinks/${index}`)}>View</button>
          </Card>
        ))}
      </div>
    </AnimatedPageWrapper>
  );
}
