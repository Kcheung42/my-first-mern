class HelloWorld extends React.Component {
  render() {
    const continents = ['Africa', 'America', 'Asia', 'Austrailia', 'Europe'];
    const helloContinents = Array.from(continents, c => `Hello ${c}!`);
    const message = helloContinents.join(' ');

    return (
      <div title="Outer div">
        <h1 className="hello">{message}</h1>
      </div>
    );
  }
}

const element = <HelloWorld />

ReactDOM.render(element, document.getElementById('contents'));
