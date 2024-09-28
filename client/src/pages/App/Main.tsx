import AnimatedPageWrapper from '../../components/AnimatedPageWrapper';
import useAuthorization from '../../hooks/useAuthorization';

export default function Main() {
  useAuthorization();

  return (
    <AnimatedPageWrapper>
      <h2>This is the app main page</h2>
    </AnimatedPageWrapper>
  );
}
