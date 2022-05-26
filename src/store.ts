import { createStore } from 'ice';
import location from '@/models/location';
import weather from '@/models/weather'

const store = createStore({
  location,
  weather,
})

export default store;
