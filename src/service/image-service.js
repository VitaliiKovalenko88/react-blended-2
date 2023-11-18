import axios from 'axios';

const API_KEY = 'iO8d3ETa76t4HP0FU5sBlFSpy3wkMIoPOkMHbyEFS6wr3zDf9MdtJNiy';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  try {
    const { data } = await axios(`search?query=${query}&page=${page}`);

    return data

  } catch (error) {
    console.log(error)
  }
};
