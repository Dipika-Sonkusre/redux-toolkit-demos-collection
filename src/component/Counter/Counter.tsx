import { decrement, increment } from "../slice/counterSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
