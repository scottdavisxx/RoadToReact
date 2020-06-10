import React from 'react';

const initialStories = [
  {
    title: 'React',
    ...
  },
  {
    title: 'Redux',
    ...
  },
];

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

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

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search', 
    'React'
  );

  const [stories, setStories] = React.useState(initialStories);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story => 
     story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <hr/>

      <List list={searchedStories} />

    </div>
  );
};

const InputWithLabel = ({
  id,
  value, 
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
    // A
    const inputRef = React.useRef();

    // C
    React.useEffect(()=> {
      if(isFocused && inputRef.current) {
        // D
        inputRef.current.focus();
      }
    }, [isFocused]);


    return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* B */}
      <input 
        ref={inputRef}
        id={id} 
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange} 
      />
    </>
    );
  };


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