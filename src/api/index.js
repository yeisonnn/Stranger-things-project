const url =
  'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts';

async function fetchPost(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export default fetchPost;
