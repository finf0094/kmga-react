export interface Session {
  id: string;
  createdAt: string;
  quizId: string;
  sendedTime: string;
  startTime: string;
  endTime: string;
  status: string;
  score: number;
  emailId: string;
  quiz: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    description: string;
    tags: string[];
    status: string;
  };
  email: {
    id: string;
    email: string;
  };
}
