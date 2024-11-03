import { Container, Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Pomodoro from "./components/Pomodoro";

export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

function App() {
  return (
    <Stack h="100vh">
      <Navbar />
      <Pomodoro />
      <Container>
        <TodoForm />
        <TodoList />
      </Container>
    </Stack>
  );
}

export default App;
