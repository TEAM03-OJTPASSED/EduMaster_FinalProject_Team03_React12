import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string, element?: JSX.Element) => {
    if (element) {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return navigateTo;
};
