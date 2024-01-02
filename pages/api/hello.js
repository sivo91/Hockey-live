




const handler = (req, res) => {

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Invalid request method!',
    });
  }

  console.log('hello');

  return res.status(201).json({
    success: true,
    message: 'Hello from the API.',
  });
};

export default handler;


