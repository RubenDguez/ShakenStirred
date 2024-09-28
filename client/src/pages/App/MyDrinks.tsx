import AnimatedPageWrapper from '../../components/AnimatedPageWrapper';
import useAuthorization from '../../hooks/useAuthorization';

export default function MyDrinks() {
  useAuthorization();

  return (
    <AnimatedPageWrapper>
      <h2>This is the My Drink page</h2>
    </AnimatedPageWrapper>
  );
}
