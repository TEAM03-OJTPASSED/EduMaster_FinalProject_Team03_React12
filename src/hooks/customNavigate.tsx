import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string, newTab?: boolean, e?: React.MouseEvent<HTMLAnchorElement>) => {
    
    if (newTab) {
      e?.preventDefault()
      e?.stopPropagation()
      window.open(path, "_blank"); 
    } else {
      e?.preventDefault()
      e?.stopPropagation()
      navigate(path); 
    }
  };

  return navigateTo;
};


