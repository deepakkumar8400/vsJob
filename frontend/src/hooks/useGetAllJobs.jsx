// src/hooks/useGetAllJobs.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setJobs, setLoading } from '../redux/jobSlice';

const JOB_API_END_POINT = 'http://localhost:9001/api/v1/job/get';

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      dispatch(setLoading()); // Set loading to true
      try {
        const res = await axios.get(JOB_API_END_POINT, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setJobs(res.data.data)); // Dispatch the fetched jobs
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;