/*import { Client } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  //
  // const client = new Client()
  //    .setEndpoint('https://cloud.appwrite.io/v1')
  //    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  //    .setKey(process.env.APPWRITE_API_KEY);

  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  // The `req` object contains the request data
  if (req.method === 'GET') {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    return res.send('Hello, World!');
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
}; */
import { Client } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('https://your-appwrite-endpoint') // Замените на ваш URL Appwrite
    .setProject('your-project-id') // Замените на ваш идентификатор проекта Appwrite
    .setKey('your-api-key'); // Замените на ваш API-ключ Appwrite

  log('Hello, Logs!');

  try {
    // Получите данные из запроса
    const formData = req.body; // Предположим, что данные формы передаются в теле запроса

    // Создайте новый документ в коллекции "application form"
    const applicationFormDoc = await client
      .collection('application form')
      .createDocument(formData);

    log('Application Form Document Created:', applicationFormDoc);

    // Создайте новый документ в коллекции "answers to questions"
    const answersDocData = {
      // Здесь вы можете добавить логику для формирования ответов на вопросы на основе данных из "application form"
      // Например, если у вас есть вопрос "Имя" в "application form", вы можете использовать applicationFormDoc[name] для получения значения
    };

    const answersDoc = await client
      .collection('answers to questions')
      .createDocument(answersDocData);

    log('Answers Document Created:', answersDoc);

    return res.json({
      message: 'Documents created successfully',
      applicationFormDoc,
      answersDoc,
    });
  } catch (e) {
    error('Error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};

