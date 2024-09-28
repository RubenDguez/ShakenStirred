import AnimatedPageWrapper from '../../components/AnimatedPageWrapper';
import useAuthorization from '../../hooks/useAuthorization';

export default function NewDrink() {
  useAuthorization();

  return (
    <AnimatedPageWrapper>
      <h2>This is the new Drink page</h2>
    </AnimatedPageWrapper>
  );
}
