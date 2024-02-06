import { useParams } from "react-router-dom";
import {
  useAddAllowedEmailMutation,
  useGetAllowedEmailsQuery,
  useDeleteAllowedEmailMutation,
} from "@store/api";
import { UIField } from "@components/Base UI";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "@components";

const AllowedEmailPage = () => {
  const { quizId } = useParams() as { quizId: string };
  const [email, setEmail] = useState("");

  const [addAllowedEmail] = useAddAllowedEmailMutation();
  const [deleteAllowedEmail] = useDeleteAllowedEmailMutation();
  const {
    data: allowedEmails,
    isLoading,
    refetch,
  } = useGetAllowedEmailsQuery(quizId);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleSubmit = async () => {
    if (email) {
      try {
        await addAllowedEmail({ quizId, email });
        toast.success("Email успешно добавлен.");
        setEmail("");
        refetch(); // Обновить список после добавления
      } catch (error) {
        console.error("Ошибка при добавлении email:", error);
        toast.error("Ошибка при добавлении email.");
      }
    } else {
      toast.error("Пожалуйста, введите email.");
    }
  };

  const handleDelete = async (emailToDelete: string) => {
    try {
      await deleteAllowedEmail({ quizId, email: emailToDelete });
      toast.success("Email успешно удален.");
      refetch(); // Обновить список после удаления
    } catch (error) {
      console.error("Ошибка при удалении email:", error);
      toast.error("Ошибка при удалении email.");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <UIField
        id={`email-${quizId}`}
        inputProps={{
          value: email,
          onChange: handleEmailChange,
          type: "email",
        }}
        label="Email"
      />
      <button onClick={handleSubmit}>Добавить</button>
      <div>
        <h3>Allowed Emails</h3>
        <ul>
          {allowedEmails &&
            allowedEmails?.allowedEmails.map((email, index) => (
              <li key={index}>
                {email}{" "}
                <button onClick={() => handleDelete(email)}>Удалить</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AllowedEmailPage;
