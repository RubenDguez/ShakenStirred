import AnimatedPageWrapper from '../../components/AnimatedPageWrapper';
import useAuthorization from '../../hooks/useAuthorization';

export default function User() {
  useAuthorization();

  return (
    <AnimatedPageWrapper>
      <h2>This is the users page</h2>
    </AnimatedPageWrapper>
  );
}
