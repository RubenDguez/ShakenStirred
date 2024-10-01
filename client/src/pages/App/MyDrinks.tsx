import { useNavigate } from 'react-router-dom';
import AnimatedPageWrapper from '../../components/AnimatedPageWrapper';
import Card from '../../components/UI/Card';
import useAuthorization from '../../hooks/useAuthorization';

const myDrinks = [
  { name: 'Ultimate Margarita' },
  { name: 'Ultimate Margarita' },
  { name: 'Ultimate Margarita' },
  { name: 'Ultimate Margarita' },
  { name: 'Ultimate Margarita' }
];

export default function MyDrinks() {
  useAuthorization();
  const navigate = useNavigate()

  return (
    <AnimatedPageWrapper>
      <h2 style={{ marginBottom: '5rem' }}>My Drinks</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {myDrinks.map((drink, index) => (
          <Card key={drink.name + index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--secondary-200)' }}></div>
              <h4>{drink.name}</h4>
            </div>
            <button onClick={() => navigate(`/app/drinks/${index}`)}>View</button>
          </Card>
        ))}
      </div>
    </AnimatedPageWrapper>
  );
}
