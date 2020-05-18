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

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
  );

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  // A - Callback function is introduced
  const handleSearch = event => {
    // C - 
    setSearchTerm(event.target.value);


  };

  const searchedStories = stories.filter(story => 
     story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr/>

      <List list={searchedStories} />

    </div>
  );
};

const Search = ({search, onSearch }) => (

    <div>
      <label htmlFor="search">Search: </label>
      <input 
        id="search" 
        type="text"
        value={search}
        onChange={onSearch} 
      />
    </div>
  );


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