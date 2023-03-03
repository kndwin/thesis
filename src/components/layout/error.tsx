import { useRouteError, useNavigate } from "react-router-dom";
import { Text, Button } from "~/components";

type RouteError = {
  data: string;
  status: number;
};
export const DashboardError = () => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex">
      <div className="p-6 m-auto text-center flex flex-col gap-5">
        <Text className="font-bold text-3xl" color="error">
          Oh no!
        </Text>
        <Text color="error">Sometime went wrong</Text>
        {error && (
          <div className="bg-red-2 p-6 rounded m-auto text-left flex flex-col gap-5">
            <Text>Status: {error.status}</Text>
            <Text>Message: {error.data}</Text>
          </div>
        )}
        <Button
          onClick={() => navigate(-1)}
          className="w-fit mx-auto"
          color="error"
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export const CommonError = () => {
  return (
    <div className="w-full h-full flex">
      <div className="bg-red-3 p-6 rounded m-6">
        <Text color="error">Oh no! Sometime went wrong</Text>
      </div>
    </div>
  );
};

export const Error = Object.assign(CommonError, {
  Dashboard: DashboardError,
});
