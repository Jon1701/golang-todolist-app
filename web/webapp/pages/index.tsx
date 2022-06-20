import React, { useEffect } from "react";

const Home: React.FC = () => {
  const fetchTodoLists = async () => {
    const result = await fetch("/api/list", { method: "GET" });
    console.log(result);
  };

  useEffect(() => {
    fetchTodoLists();
  }, []);

  return <div>Hello World</div>;
};

export default Home;
