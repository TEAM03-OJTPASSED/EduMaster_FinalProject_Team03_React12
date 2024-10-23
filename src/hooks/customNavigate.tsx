import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string, newTab?: boolean) => {
    if (newTab) {
      window.open(path, "_blank"); 
    } else {
      navigate(path); 
    }
  };

  return navigateTo;
};
