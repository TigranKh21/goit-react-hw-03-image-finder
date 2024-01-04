import axios from 'axios';

const mainUrl = 'https://pixabay.com/api/';
const apiKey = '40632330-75f4a7e3fdd59698a6ace0990';
const searchQuery = 'yellow flowers';
const imageType = 'photos';

export const requestImg = async () => {
  const { data } = await axios.get(
    `${mainUrl}?key=${apiKey}&q=${searchQuery}&image_type=${imageType}&per_page=12`
  );
  return data;
};
