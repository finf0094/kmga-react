import { useNavigate, useParams } from "react-router-dom";
import { useCreateSessionMutation } from "@store/api";
import { UIField, UITitle } from "@components/Base UI";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "@components";
import './AllowedEmail.css'

const AllowedEmailPage = () => {
  const { quizId } = useParams() as { quizId: string };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [createSession, { isLoading }] = useCreateSessionMutation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleSubmit = async () => {
    if (email) {
      try {
        await createSession({ quizId, email });
        toast.success("Сессия успешно была создана.");
        setEmail("");
        // refetch(); // Обновить список после добавления
      } catch (error) {
        console.error("Ошибка при создании сессии:", error);
        toast.error("Ошибка при создании сессии.");
      }
    } else {
      toast.error("Пожалуйста, введите email.");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="allowed-email page">
      <div className="back" onClick={() => navigate(-1)}>Назад</div>
      <UITitle title="Доступ" subtitle="Дать доступ пользователю к тесту" />
      <div className="allowed-email__create">
        <UIField
          id={`email-${quizId}`}
          inputProps={{
            value: email,
            onChange: handleEmailChange,
            type: "email",
          }}
          label="Email"
        />
        <button onClick={handleSubmit} className="allowed-email__button">Добавить</button>
      </div>
      {/* <div className="allowed-email__table">
        <table>
          <thead>
            <tr>
              <td className='user'><span>Пользователь</span> <span>Посмотреть</span></td>
            </tr>
          </thead>
          <tbody>
          {allowedEmails &&
            allowedEmails?.allowedEmails.map((email, index) => (
              <tr>
                <td key={index} className='user'>
                  {email}
                  <button onClick={() => handleDelete(email)} className="allowed-email__delete">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default AllowedEmailPage;
