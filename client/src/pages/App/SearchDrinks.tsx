import AnimatedPageWrapper from '../../components/AnimatedPageWrapper';
import useAuthorization from '../../hooks/useAuthorization';

export default function SearchDrinks() {
  useAuthorization();

  return (
    <AnimatedPageWrapper>
      <h2>This is the Search Drinks page</h2>
    </AnimatedPageWrapper>
  );
}
