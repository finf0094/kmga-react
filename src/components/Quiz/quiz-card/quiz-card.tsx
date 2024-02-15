import "./quiz-card.css";
import UserIcon from "@assets/icons/user.svg";
import PlusIcon from "@assets/icons/plus.svg";
import ChangeIcon from "@assets/icons/edit.svg";
import QuestionStatisticsIcon from "@assets/icons/question-statistics.svg";
import { formatDate } from "@src/utils";
import { getStatusText } from "@src/utils/getStatusText";
import { Link } from "react-router-dom";
import { useDeleteQuizByIdMutation } from "@src/store/api";
import { ErrorResponse } from "@src/interfaces";
import toast from "react-hot-toast";
import DeleteIcon from "@assets/icons/delete.svg";

interface ICardProps {
  id: string;
  title: string;
  description?: string;
  status: string;
  tags: string[];
  createdAt: string;
}

export default function QuizCard({
  id,
  title,
  status,
  tags,
  createdAt,
}: ICardProps) {
  const { day, month, year, hours, minutes } = formatDate(createdAt);
  const [deleteQuestion] = useDeleteQuizByIdMutation();

  const handleDelete = async (quizId: string) => {
    try {
      await deleteQuestion(quizId).unwrap();
      toast.success(`Question was deleted successfuly!`);
      window.location.reload();
    } catch (err: unknown) {
      const error = err as ErrorResponse;
      if (error?.status === 403) {
        toast.error("You don't have enough rights to delete a question!");
      }
      console.error("Failed to create quiz:", err);
    }
  };

  return (
    <div className="quiz-card">
      <div className="quiz-card-top">
        <div className="quiz-card-header-left">
          <h3 className="quiz-card-title">{title}</h3>
          <div className="quiz-card-status">
            <span className={`status-dot ${status.toLowerCase()}`}></span>
            <span className={`status-description ${status.toLowerCase()}`}>
              {getStatusText(status)}
            </span>
          </div>
        </div>
        <div className="quiz-card-header-right">
          <div className="icons">
            <Link to={`/quiz/${id}/question`}>
              <img src={PlusIcon} alt="Add" />
            </Link>
            <Link to={`/quiz/${id}/allowed-emails`}>
              <img src={UserIcon} alt="Add" />
            </Link>
            <Link to={`/quiz/${id}/question/statistics`}>
              <img src={QuestionStatisticsIcon} alt="question statistics" />
            </Link>
            <Link to={`/quiz/${id}/edit`}>
              <img src={ChangeIcon} alt="Edit" />
            </Link>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(id)}
            >
              <img src={DeleteIcon} width="24px" height="24px" alt="delete" />
            </span>
          </div>
          <div className="quiz-card-footer">
            <div className="quiz-date">{`${day} ${month} ${year} года в ${hours}:${minutes}`}</div>
          </div>
        </div>
      </div>
      {tags.length > 0 ? (
        <div className="quiz-card-footer">
          <span className="quiz-card-tags-title">Tags</span>
          <ul className="quiz-card-tags">
            {tags.map((tag, index) => (
              <li className="quiz-tag" key={index}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="quiz-card-footer">
          <span className="quiz-card-tags-title">No tags</span>
        </div>
      )}
    </div>
  );
}
