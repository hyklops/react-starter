import React from "react";

export default function Start(props) {
  const [categoryList, setCategoryList] = React.useState([]);
  const { handleChange, handleSubmit, startQuiz, category } = props;

  React.useEffect(() => {
    async function getCategoryList() {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      setCategoryList(data.trivia_categories);
    }
    getCategoryList();
  }, []);

  return (
    <section className="start-section">
      <h1>Quizzical</h1>
      <h3>How much do you really know?</h3>
      <section>
        <form onSubmit={handleSubmit} className="select-section">
          <label htmlFor="categoryList">Select a Topic</label>
          <br />
          <select
            className="select-list"
            id="categoryList"
            value={category}
            name="categoryList"
            onChange={handleChange}
          >
            {categoryList.map((category) => (
              <option value={category.id} key={category.name} id={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </form>
        <button onClick={startQuiz}>Start Quiz</button>
      </section>
    </section>
  );
}
