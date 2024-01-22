export const useGetUserInfo = () => {
    const { name, email, userID } =
      JSON.parse(localStorage.getItem("auth")) || {};
  
    return { name, email, userID };
  };