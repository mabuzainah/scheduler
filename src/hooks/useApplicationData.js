import { useReducer } from "react";
import axios  from "axios";
import { useEffect, useRef } from "react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export function useApplicationData() {  
  const [state, dispatch] = useReducer( reducer, {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: []
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(result => {
      dispatch({
        type: SET_INTERVIEW,
        value: {
          appointments: appointments,
          interview: interview
        }
      });
    })
  }
  
  function cancelInterview (id) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }
      const appointments = {
        ...state.appointments,
        [id] : appointment
      }
      return axios.delete(`/api/appointments/${id}`)
      .then(result =>{
        dispatch({
          type: SET_INTERVIEW,
          value: {
            appointments: appointments,
            interview: null,
          }
        });
      });
  }

  
  function getDaysAxios() {
    return axios.get('/api/days');
  }

  function getAppointmentsAxios() {
    return axios.get('/api/appointments');
  }

  function getInterviewersAxios() {
    
    return axios.get('/api/interviewers');
  }
  useEffect(() => {
    Promise.all([
      getDaysAxios(),
      getAppointmentsAxios(),
      getInterviewersAxios(),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);
  
  const socket = useRef(null)
  useEffect(()=> {
    socket.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.current.onopen = () => {
      console.log("Web socket opened");
      socket.current.send("Ping...");
    };
    socket.current.onclose = e => console.log("CLOSED!!!!!!")
    
    const wsCurrent = socket.current;
      console.log(wsCurrent)
    return () => {
      wsCurrent.close()
    };
  },[]);

  useEffect (() => {
    if(!socket.current) return;
    socket.current.onmessage = event => {
      const message = JSON.parse(event.data);
      const appointment = {
        id: message.id,
        // hardcoded for now 
        time: "12pm",
        interview: message.interview !== null? { ...message.interview} : null
      }
      const appointments = {
        ...state.appointments,
        [message.id]: appointment
      };
        dispatch(
        { 
          type: message.type, 
          value: {
            appointments: appointments,
            interview: message.interview
          }
        });
    };
  },[state.appointments])

  return {
      state,
      setDay,
      bookInterview,
      cancelInterview
  };
}