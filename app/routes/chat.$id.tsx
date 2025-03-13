import type { GetServerSideProps } from 'next';
import IndexRoute from '../../pages/index';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.params?.id,
    },
  };
};

export default IndexRoute;
