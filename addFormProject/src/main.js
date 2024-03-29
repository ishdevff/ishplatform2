import { Client, Databases, ID, Query } from 'node-appwrite'; //mjj


export default async ({ req, res, log, error }) => {
  try {
      if (req.method === 'GET') {
          return res.send('Function was updated'); //yh
      }

      if (req.method === 'POST') {
          const client = new Client();
          client
              .setEndpoint('https://appwrite.simpatica.ru/v1')
              .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
              .setKey(process.env.APPWRITE_API_KEY);

          const databases = new Databases(client);
          //const appFormID = req.body.appFormID;
          const userID = req.body.userID;
          //const projectName = req.body.projectName;
          const id = new Date().getTime().toString(); //jj

          try {
            
    
            // Создаем документ в коллекции "projects"
            const projectDocument = {
              
              owner: userID,
              project_name: 'автоматически созданный проект ',
            };
            // + new Date().toLocaleDateString()
            const projectResponse = await databases.createDocument('6582ffb343b013e12898', '658302310aec81615ab7', id,projectDocument);
    
            // Создаем документ в коллекции "app form"
            const appFormDocument = {
             
              mainProject: id,
              version: new Date().toLocaleDateString(),
              progress: [0,0,0,0,0,0,0],
            };
            const appFormResponse = await databases.createDocument('6582ffb343b013e12898', '659accc9e4dcac4bc9a1', id,appFormDocument);
    
            // Обновляем документ в коллекции "projects" с добавлением значения в поле applicationFormID
            const updatedProjectDocument = {
              applicationFormID: [id],
            };
           // const updateProjectResponse = await databases.updateDocument('6582ffb343b013e12898', id, updatedProjectDocument);
    
            
            const appFormID = id;
            
            
            
            
            
            
            // Получаем все документы из коллекции "questions"
              const questions = await databases.listDocuments('6582ffb343b013e12898', '659a6700a1ff01884885'); //kимит 1 для отладки
              
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
                // Завершаем цикл после первой итерации
   // break;
              }
            //возвращаем ID созданных проекта и анкеты
const resultDocument = {
              
              projectID: id,
              appFormID: id,
            };
             // return res.json(createdDocuments);
            return res.json(resultDocument);
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


