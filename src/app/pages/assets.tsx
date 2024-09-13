import { FC } from 'react';

const AssetsPage: FC = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Our Assets</h1>
      <p className="mt-4 text-lg">
        View and manage the assets available in our application.
      </p>
      {/* Add asset display logic here */}
    </div>
  );
};

export default AssetsPage;
