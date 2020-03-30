import React from 'react';

const App = () => {

  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr/>

      <List list={stories} />

    </div>
  );
};

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <p>
        Searching for: <strong>{searchTerm}</strong>
      </p>
    </div>
  )
}

const List = props => 
  props.list.map(item => (
      <div key={item.objectID}>
        <span>
          <a target="_blank" rel="noopener noreferrer" href={item.url}>{item.title}</a>
        </span>
        <br /><span>{item.author} </span>
        <br /><span>Comments: {item.num_comments} </span>
        <br /><span>Points: {item.points} </span>
        <br />
        <br />
      </div>
  ));

export default App;