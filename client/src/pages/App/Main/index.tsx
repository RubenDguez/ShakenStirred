import { useNavigate } from 'react-router-dom';
import AnimatedPageWrapper from '../../../components/AnimatedPageWrapper';
import Card from '../../../components/UI/Card';
import useAuthorization from '../../../hooks/useAuthorization';
import styles from './main.module.css';

export default function Main() {
  const navigate = useNavigate();
  useAuthorization();

  return (
    <AnimatedPageWrapper>
      <div className={`${styles.main}`}>
        <Card style={{ height: '20rem' }}>
          <header>
            <h2>Your drinks</h2>
          </header>
          <p>1</p>
          <button onClick={() => navigate('/app/my-drinks')}>view</button>
        </Card>

        <div className={`${styles.cardGroup}`}>
          <Card>
            <header>
              <h2>drinks reviews</h2>
            </header>
            <p>16</p>
            <button>view</button>
          </Card>
          <Card>
            <header>
              <h2>All Drinks</h2>
            </header>
            <p>500,000</p>
            <button>view</button>
          </Card>
          <Card>
            <header>
              <h2>Drink Inspiration</h2>
            </header>
            <p>1</p>
            <button>view</button>
          </Card>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
}
