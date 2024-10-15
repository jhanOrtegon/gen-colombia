import { BallTriangle, useLoading } from '@agney/react-loading';

export const Loading = ({isLoading}:{isLoading:boolean}) => {

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="130" />,
  });
  
  return (
    <>
      {
        isLoading && (
          <div className='loading text-primary-darkBlue' {...containerProps}>
            {indicatorEl}
          </div>
        )
      }
    </>
  );
};