import React, { useState, useEffect } from "react";
import axios from "axios";

interface Data {
  seenIndexes: any[];
  values: { [key: string]: string };
  index: string;
}

export const Fib = () => {
  const initialData: Data = {
    seenIndexes: [],
    values: {},
    index: "",
  };

  const [state, setState] = useState(initialData);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setState({
      ...state,
      seenIndexes: seenIndexes.data,
    });
  };

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setState({
      ...state,
      values: values.data,
    });
  };

  const renderSeenIndexes = (): string => {
    return state.seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = (): JSX.Element[] => {
    const entries = [];
    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      );
    }
    return entries;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    await axios.post("/api/values", {
      index: state.index,
    });
    setState({ ...state, index: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={state.index}
          onChange={(event) =>
            setState({ ...state, index: event.target.value })
          }
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};
