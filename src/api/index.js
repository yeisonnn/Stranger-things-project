//Fecthing posts function
export async function postFetch(ObjOptions) {
  try {
    const response = await fetch(
      'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts'
    );
    if (!response.ok) {
      throw new Error('There was a Problem!!');
    }
    const data = await response.json();

    ObjOptions.setInitialState(data.data.posts);
    ObjOptions.setDataFiltered(data.data.posts);
    return data.data.posts;
  } catch (error) {
    console.error(error);
  }
}

// Fetching profile data function
export async function userProfileFetch(ObjOptions) {
  ObjOptions.setIsLoading(true);
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/users/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ObjOptions.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Something Went Wrong');
    }
    const data = await response.json();
    ObjOptions.setInitialState(data.data.messages);
    ObjOptions.setIsLoading(false);
    return data.data.messages;
  } catch (error) {
    console.error(error);
  }
}

// fetching a single post
export async function singlePostFetch(objOptions) {
  try {
    const response = await fetch(
      'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts'
    );

    if (!response.ok) {
      throw new Error('There was a Problem!!');
    }
    const data = await response.json();
    const dataPostArray = await data.data.posts;
    const singlePost = dataPostArray.find(
      (post) => post._id === objOptions.params.id
    );
    objOptions.initialState(singlePost);
    return singlePost;
  } catch (error) {
    console.error(error);
  }
}

// deleting a post
export async function deleteFetch(objOptions) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts/${objOptions.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${objOptions.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Could not delete post!');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// user login Fetch Function
export async function userLoginFetch(ObjOptions) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/users/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ObjOptions.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Something Went Wrong');
    }

    const data = await response.json();

    if (data.data) {
      ObjOptions.navigate('/home');
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Updating post fetch function
export async function updateFetch(objOptions) {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT/posts/${objOptions.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${objOptions.token}`,
        },
        body: JSON.stringify({
          post: {
            title: objOptions.title,
            description: objOptions.description,
            price: objOptions.price,
            location: objOptions.location,
            willDeliver: true,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Your post was not updated');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
