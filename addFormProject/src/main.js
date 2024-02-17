import { Client,Databases } from 'node-appwrite';


export default async ({ req, res, log, error }) => {
  try {
      if (req.method === 'GET') {
          return res.send('Function was updated'); //y
      }

      if (req.method === 'POST') {
          const client = new Client();
          client
              .setEndpoint('https://appwrite.simpatica.ru/v1')
              .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
              .setKey(process.env.APPWRITE_API_KEY);

          const databases = new Databases(client);
          const appFormID = req.body.appFormID;

          try {
              // Получаем все документы из коллекции "questions"
              const questions = await databases.listDocuments('6582ffb343b013e12898', '659a6700a1ff01884885',1); //kимит 1 для отладки
              
              const createdDocuments = [];

              // Создаем связанный документ в коллекции "answers to questions" для каждого вопроса
              for (const question of questions.documents) {
                  const document = {
                      applicationForm: appFormID,
                      questionsID: question.$id,
                      sectionID: question.sectionID,
                      idInSection: question.idInSection,
                  };

                  const response = await databases.createDocument('6582ffb343b013e12898', '659aabc2d7db8029d9f8', ID.unique(), document);
                  createdDocuments.push(response);
              }

              return res.json(createdDocuments);
          } catch (error) {
              console.log(error); // Log the error
              return res.json({ 'status:': 500, 'error': 'Error creating documents' });
          }
      }
  } catch (err) {
      console.error('Unexpected error:', err);
      return res.json({ 'status:': 500, 'error': 'Unexpected error' });
  }
};


