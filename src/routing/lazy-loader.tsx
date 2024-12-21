import React, { ComponentType, Suspense } from 'react';

// TODO: use static loader for fallback
const Loader =
  <P extends object>(Component: ComponentType<P>): React.FC<P> =>
  (props: P) => (
    <Suspense fallback={<p>Loading...</p>}>
      <Component {...props} />
    </Suspense>
  );

export default Loader;
