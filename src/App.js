import React from 'react';
import './App.css';
import { addScheduleTimes } from './utilities/time.js'
import CourseList from './components/CourseList.js';
import { useData } from './utilities/firebase.js';

const Banner = ({ title }) => (
  <h1>{title}</h1>
);

const App = () => {
  const [schedule, loading, error] = useData('/schedule', addScheduleTimes);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

export default App;