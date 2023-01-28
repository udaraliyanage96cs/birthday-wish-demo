import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [gender, setGender] = useState("girl");
  const [age, setAge] = useState(18);
  const [hobbies, setHobbies] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult("");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gender: gender, age: age, hobbies: hobbies }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll("\n", "<br />"));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>OpenAI - Udarax</title>
      </Head>

      <main className={styles.main}>
        <h3>Birthday Poem Generator</h3>
        <form onSubmit={onSubmit}>
          <div>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-control mt-2"
              required
            >
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="hobbies"
              placeholder="Dancing, Reading, Travelling"
              value={hobbies}
              className="form-control mt-2"
              required
              onChange={(e) => setHobbies(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              min={1}
              max={99}
              name="age"
              placeholder="Enter the age"
              value={age}
              required
              onChange={(e) => setAge(Number.parseInt(e.target.value))}
              className="form-control mt-2"
            />
          </div>
          <input type="submit" value="Generate Poems" />
        </form>
        {loading && <p>Loading ...</p>}
        <div
          className={`d-flex justify-content-center`}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}
